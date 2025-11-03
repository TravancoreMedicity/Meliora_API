// @ts-nocheck
require("dotenv").config();
const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const {
  insertUser,
  editUser,
  deleteUser,
  getUser,
  getAllUser,
  insertRefreshToken,
  getRefershToken,
  deleteRefreshToken,
  validateUserCredExcistOrNot,
  userBasedValidationCheck,
  userBasedInsertRefreshToken,
} = require("./user.service");

const { addHours, format } = require("date-fns");
const logger = require("../../logger/logger");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helperFunction/HelperFunction");
const { encrypt, decrypt } = require("../EncryptionHandler/EncryptionHandler");
const { validateUserLoginCheck } = require("./user.function");

module.exports = {
  insertUser: (req, res) => {
    const body = req.body;

    validateUserCredExcistOrNot(body, (error, results) => {
      if (error) {
        logger.error(error);
        return res.status(200).json({
          success: 0,
          message: "Database connection error" + error,
        });
      }

      if (results?.length > 0) {
        return res.status(200).json({
          success: 2,
          message: "User Credentials already exist",
        });
      }

      const salt = genSaltSync(10);
      const passwordEncryption = hashSync(body.password, salt);

      const bodtData = {
        ...body,
        password: passwordEncryption,
      };

      insertUser(bodtData, (error, results) => {
        if (error) {
          logger.error(error);
          return res.status(200).json({
            success: 0,
            message: "Database connection error" + error,
          });
        }
        return res.status(200).json({
          success: 1,
          message: "User created successfully",
        });
      });
    });
  },
  editUser: (req, res) => {
    const body = req.body;
    editUser(body, (error, results) => {
      if (error) {
        logger.error(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    deleteUser(id, (error, results) => {
      if (error) {
        logger.error(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUser: (req, res) => {
    const id = req.params.id;
    getUser(id, (error, results) => {
      if (error) {
        logger.error(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }

      if (results?.length === 0) {
        return res.status(200).json({
          success: 2,
          message: "no data",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getAllUser: (req, res) => {
    getAllUser((error, results) => {
      if (error) {
        logger.error(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }

      if (results?.length === 0) {
        return res.status(200).json({
          success: 2,
          message: "no data",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getRefershToken: (req, res) => {
    const id = req.params.id;
    getRefershToken(id, (error, results) => {
      if (error) {
        logger.error(error);
        deleteRefreshToken(id, (error, results) => {
          if (error) {
            logger.error(error);
            res.clearCookie("accessToken");
            return res.status(403).json({ message: "Invalid refresh token" });
          }
          res.clearCookie("accessToken");
          return res.status(403).json({ message: "Invalid refresh token" });
        });
      }

      if (results.length === 0) {
        deleteRefreshToken(id, (error, results) => {
          if (error) {
            logger.error(error);
            res.clearCookie("accessToken");
            return res.status(403).json({ message: "Invalid refresh token" });
          }
          res.clearCookie("accessToken");
          return res.status(403).json({ message: "Invalid refresh token" });
        });
        // return res.status(403).json({ message: "Invalid refresh token" });
      }

      if (results.length > 0) {
        const refreshToken = results[0].token;
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, user) => {
            if (err) {
              // DELETE REFRESH TOKEN
              deleteRefreshToken(id, (error, results) => {
                if (error) {
                  logger.error(error);
                  res.clearCookie("accessToken");
                  return res
                    .status(403)
                    .json({ message: "Invalid refresh token" });
                }
                res.clearCookie("accessToken");
                return res
                  .status(403)
                  .json({ message: "Invalid refresh token" });
              });
            } else {
              const newAccessToken = jwt.sign(
                { id: id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
              );
              res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: false,
                maxAge: process.env.COOKIE_TIME, // 15 min
                sameSite: "strict",
              });
              res.json({ message: "revalidated" });
            }
          }
        );
      }
    });
  },
  logOutFunctionality: (req, res) => {
    const id = req.params.id;
    deleteRefreshToken(id, (error, results) => {
      if (error) {
        logger.error(error);
        res.clearCookie("accessToken");
        return res.status(200).json({ message: "Invalid refresh token" });
      }
      res.clearCookie("accessToken");
      return res.status(200).json({ message: "Invalid refresh token" });
    });
  },
  userBasedLoginVerification: async (req, res) => {
    const body = req.body;
    console.log(body);
    // CHECK USER BASED VALIDATION FIRST CHECK THE PASSWORD CREDENTIAL THEN REST
    userBasedValidationCheck(body, (error, results) => {
      if (error) {
        logger.error(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      if (results.length === 0) {
        return res.status(200).json({
          success: 1,
          message: "Incorrect User Credentials",
        });
      }
      if (results.length > 0) {
        const userData = results[0];
        const userPassword = body.passWord;
        const validated = compareSync(userPassword, userData.emp_password);

        if (validated) {
          const {
            empdtl_slno, // user_slno
            login_type,
            password_validity,
            last_passwd_change_date,
            password_validity_expiry_date,
            last_login_date,
            login_method_allowed,
            em_id,
            emp_no,
          } = userData;
          console.log(userData);

          const validatingUserLogin = validateUserLoginCheck(
            password_validity,
            last_passwd_change_date,
            last_login_date,
            login_method_allowed,
            body.method
          );
          const { message, status } = validatingUserLogin;
          if (status) {
            return res.status(200).json({
              success: 1,
              message,
            });
          } else {
            const accessToken = generateAccessToken(empdtl_slno);
            const refreshToken = generateRefreshToken(empdtl_slno); //instead use empdtl_slno
            // insert the refresh token
            //user_slno to empdtl_slno
            userBasedInsertRefreshToken(
              { empdtl_slno, refresh_token: refreshToken },
              (error, results) => {
                if (error) {
                  // logger.error(error);
                  return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                  });
                }
                if (results) {
                  const returnData = {
                    empdtl_slno,
                    login_method_allowed,
                    emp_no,
                    emp_id: userData.em_id,
                    token: accessToken,
                    user: userData.emp_username,
                    emp_name: userData.em_name,
                    emp_sec: userData.sec_name,
                    emp_secid: userData.em_dept_section,
                    app_token: userData.app_token,
                    emp_dept: userData.em_department,
                    dept_name: userData.dept_name,
                    logintime: userData.login,
                    supervisor: userData.supervisor,
                    logOutTime: format(
                      addHours(new Date(userData.login), 1),
                      "yyyy-MM-dd HH:mm:ss"
                    ),
                    desg_name: userData.desg_name,
                    // token: jsontoken,
                    // user: results.emp_username,
                    // emp_no: results.emp_no,
                    // emp_id: results.em_id,
                    // emp_name: results.em_name,
                    // emp_sec: results.sec_name,
                    // emp_secid: results.em_dept_section,
                    // app_token: results.app_token,
                    // emp_dept: results.em_department,
                    // dept_name: results.dept_name,
                    // logintime: results.login,
                    // supervisor: results.supervisor,
                    // logOutTime: format(addHours(new Date(results.login), logout_time), 'yyyy-MM-dd HH:mm:ss'),
                    // desg_name: results.desg_name,
                  };
                  res.cookie("accessToken", accessToken, {
                    // httpOnly: true,
                    secure: false, // Set to false for HTTP (localhost). Use true for HTTPS (production).
                    maxAge: process.env.COOKIE_TIME, // Optional: sets cookie expiry time in milliseconds  15 min
                    sameSite: "Lax", // Helps with CSRF protection; strict is better than lax for security reasons
                    // in Production change samsite : "None" and the secure:true for  only https
                  });
                  res.json({
                    success: 2,
                    userInfo: JSON.stringify(returnData),
                    message: "User Credentials verified successfully",
                  });
                }
              }
            );
          }
        } else {
          return res.status(200).json({
            success: 1,
            message: "Incorrect User Credentials",
          });
        }
      }
    });
  },

};
