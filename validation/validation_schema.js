const Joi = require("joi");


// employee table data validation
const validateEmployee = Joi.object({
    emp_username: Joi.string().required(),
    emp_password: Joi.string().required(),
    emp_status: Joi.required(),
    emp_slno: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional()
});

//User Group Master validation 
const validateUserGroup = Joi.object({
    user_grp_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'User group Name is Required',
            'string.min': 'User group Name length must be at least 3 characters long',
            'string.max': 'User group Name length must be less than or equal to 45 characters long'
        }),
    user_grp_status: Joi.number().min(0).max(1),
    user_grp_slno: Joi.optional()
})
//User rights validation
const validateUserRights = Joi.object({
    emp_slno: Joi.optional(),
    module_slno: Joi.optional(),
    mod_grp_slno: Joi.optional(),
    mod_grp_user_status: Joi.number().min(0).max(1)
})
//User Creation Validation
const validateUserCreation = Joi.object({
    em_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': ' Name is Required',
            'string.min': ' Name length must be at least 3 characters long',
            'string.max': 'Name length must be less than or equal to 45 characters long'
        }),
    em_no: Joi.number().required(),
    em_gender: Joi.number().required(),
    em_dob: Joi.date().optional(),
    em_doj: Joi.date().optional(),
    em_mobile: Joi.number().min(10).max(10).required()
        .messages({
            'number.empty': 'Mobile Number is Required',
            'number.min': 'Mobile Number must be 10 digits',
            'number.max': 'Mobile Number must be 10 digits'
        }),
    em_email: Joi.string().email().required(),
    em_branch: Joi.number().optional(),
    em_department: Joi.number().optional(),
    em_dept_section: Joi.number().optional(),
    em_status: Joi.number().optional(),
    em_id: Joi.number().optional(),
    em_salutation: Joi.number().optional()
})







// Department  validation
const validateDepartment = Joi.object({
    dept_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Department Name is Required',
            'string.min': 'Department Name length must be at least 3 characters long',
            'string.max': 'Department Name length must be less than or equal to 45 characters long'
        }),
    dept_status: Joi.number().min(0).max(1),
    dept_alias: Joi.string().trim().uppercase().min(1).max(5).required()
        .messages({
            'string.empty': 'Alias Name is Required',
            'string.min': 'Alias Name length must be at least 1 characters long',
            'string.max': 'Alias Name length must be less than or equal to 5 characters long',
        }),
    dept_id: Joi.optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});
// Department Section  validation
const validateDeptSec = Joi.object({
    sec_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Department Section Name is Required',
            'string.min': 'Department Section Name length must be at least 3 characters long',
            'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
        }),
    dept_id: Joi.number().optional(),
    sec_status: Joi.number().min(0).max(1),
    sec_id: Joi.optional(),
    dept_sub_sect: Joi.optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
    ou_code: Joi.optional()
});
//ModuleMaster Validation 
const validateModulemaster = Joi.object({
    module_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Module Name is Required',
            'string.min': 'Module Name length must be at least 3 characters long',
            'string.max': 'Module Name length must be less than or equal to 45 characters long'
        }),
    module_status: Joi.number().min(0).max(1).required(),
    module_slno: Joi.number().optional(),
});
//Module group master
const validateModuleGroup = Joi.object({
    mod_grp_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Module group Name is Required',
            'string.min': 'Module group Name length must be at least 3 characters long',
            'string.max': 'Module group Name length must be less than or equal to 45 characters long'
        }),
    module_slno: Joi.optional(),
    mod_grp_slno: Joi.number().optional()
})

//MenuMaster Validation
const validateMenuMaster = Joi.object({
    menu_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Menu Master Name is Required',
            'string.min': 'Menu Master Name length must be at least 3 characters long',
            'string.max': 'Menu Master  Name length must be less than or equal to 45 characters long'
        }),
    menu_slno: Joi.number().optional(),
    menu_module_slno: Joi.number().optional(),
    menu_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});


//ComplaintDept validation
const validateComplaintDept = Joi.object({
    complaint_dept_name: Joi.string().trim().uppercase().min(2).max(45).required()
        .messages({
            'string.empty': 'Complaintdepartment Name is Required',
            'string.min': 'Complaintdepartment Name length must be at least 2 characters long',
            'string.max': 'Complaintdepartment Name length must be less than or equal to 45 characters long'
        }),
    complaint_dept_slno: Joi.number().optional(),
    complaint_dept_status: Joi.number().min(0).max(1).required(),
    department_slno: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});
//ComplaintType Validation
const validateComplaintType = Joi.object({
    complaint_type_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Complainttype Name is Required',
            'string.min': 'Complainttype Name length must be at least 3 characters long',
            'string.max': 'Complainttype Name length must be less than or equal to 45 characters long'
        }),
    complaint_type_slno: Joi.number().optional(),
    complaint_type_status: Joi.number().min(0).max(1).required(),
    complaint_dept_slno: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});
//HicPolicy Validation
const validateHicPolicy = Joi.object({
    hic_policy_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Hicpolicy Name is Required',
            'string.min': 'Hicpolicy Name length must be at least 3 characters long',
            'string.max': 'Hicpolicy Name length must be less than or equal to 45 characters long'
        }),
    hic_policy_slno: Joi.number().optional(),
    hic_policy_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});
//Asset Type Validation
const validateAssetType = Joi.object({
    asset_type_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Asset Name  Required',
            'string.min': 'Asset Name length must be at least 3 characters long',
            'string.max': 'Asset Name length must be less tahn or equal to 45 characters long'
        }),
    asset_type_slno: Joi.number().optional(),
    asset_type_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});
//Request Type Validation
const validateRequestType = Joi.object({
    req_type_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Request Type Name is Required',
            'string.min': ' Request Type Name length must be at least 3 characters long',
            'string.max': 'Request Type Name length must be less tahn or equal to 45 characters long'
        }),
    req_type_slno: Joi.number().optional(),
    req_type_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});
//Building Master
const validateBuilding = Joi.object({
    build_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Building Name is Required',
            'string.min': ' Building Name length must be at least 3 characters long',
            'string.max': 'Building Name length must be less tahn or equal to 45 characters long'
        }),
    build_alias: Joi.string().trim().uppercase().min(1).max(5).required()
        .messages({
            'string.empty': 'Alias Name is Required',
            'string.min': 'Alias Name length must be at least 1 characters long',
            'string.max': 'Alias Name length must be less than or equal to 5 characters long',
        }),
    build_code: Joi.number().optional(),
    status: Joi.number().min(0).max(1).required(),
    build_no: Joi.number().optional(),
    status: Joi.number().min(0).max(1).required(),
    em_id: Joi.number().optional(),
});
//Floor Master
const validateFloor = Joi.object({
    floor_desc: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Floor Description is Required',
            'string.min': 'Floor Description length must be at least 3 characters long',
            'string.max': 'Floor Description length must be less tahn or equal to 45 characters long'
        }),
    floor_code: Joi.number().optional(),
    build_code: Joi.number().optional(),
    floor_number: Joi.number().optional(),
    floor_status: Joi.number().min(0).max(1).required(),
    em_id: Joi.number().optional(),
});
//Room type master
const validateRoomtype = Joi.object({
    rmc_desc: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Room Type Description is Required',
            'string.min': ' Room Type Description must be at least 3 characters long',
            'string.max': 'Room Type Description length must be less tahn or equal to 45 characters long'
        }),
    rmc_type: Joi.number().optional(),
    rt_code: Joi.string().optional(),
    rmc_status: Joi.number().min(0).max(1).required(),
    em_id: Joi.number().optional(),
});
//Diet Master Validation
const ValidateDietMaster = Joi.object({
    diet_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Diet Name is Required',
            'string.min': ' Diet Name must be at least 3 characters long',
            'string.max': 'Diet Name length must be less tahn or equal to 45 characters long'
        }),
    diet_slno: Joi.number().optional(),
    diet_status: Joi.number().min(0).max(1).required(),
    order_req: Joi.number().min(0).max(1).required(),
    diet_type_choose: Joi.number().min(0).max(1).required(),
    em_id: Joi.number().optional(),
})
//Diet Type Validation
const ValidateDietType = Joi.object({
    type_desc: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Diet Type is Required',
            'string.min': ' Diet Type must be at least 3 characters long',
            'string.max': 'Diet Type length must be less tahn or equal to 45 characters long'
        }),
    type_slno: Joi.number().optional(),
    status: Joi.number().min(0).max(1).required(),
    start_time: Joi.date().optional(),
    end_time: Joi.date().optional(),
    em_id: Joi.number().optional()
})
//Room Creation 
const validateRoomcreation = Joi.object({
    rmc_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Room Name  is Required',
            'string.min': ' Room Name must be at least 3 characters long',
            'string.max': 'Room Name  length must be less tahn or equal to 45 characters long'
        }),
    rmc_slno: Joi.number().optional(),
    rmc_type: Joi.number().optional(),
    rm_code: Joi.string().optional(),
    rmc_status: Joi.number().min(0).max(1).required(),
    em_id: Joi.number().optional(),

})
//subroom creation
const validateSubroomcreation = Joi.object({
    subrm_desc: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Subroom Name  is Required',
            'string.min': 'Subroom Name must be at least 3 characters long',
            'string.max': 'Subroom Name  length must be less tahn or equal to 45 characters long'
        }),
    subrm_slno: Joi.number().optional(),
    rmc_slno: Joi.number().optional(),
    rmc_type: Joi.number().optional(),
    status: Joi.number().min(0).max(1).required(),
    em_id: Joi.number().optional(),
})


//User Group rights validation
const validateUserGroupRights = Joi.object({
    user_group_slno: Joi.optional(),
    module_slno: Joi.optional(),
    menu_slno: Joi.optional(),
    menu_view: Joi.optional(),
    group_right_slno: Joi.optional()
})

const validateModuleGroupRight = Joi.object({
    emp_slno: Joi.number().required(),
    mod_grp_slno: Joi.number().required(),
    user_group_slno: Joi.number().required(),
    mod_grp_user_status: Joi.number().required(),
    mod_grp_user_slno: Joi.number().optional(),
    dept_slno: Joi.number().required(),
    deptsec_slno: Joi.number().required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
})

const validateComplaintRegist = Joi.object({
    complaint_desc: Joi.string().required(),
    complaint_dept_secslno: Joi.number().required(),
    complaint_request_slno: Joi.number().required(),
    complaint_deptslno: Joi.number().required(),
    complaint_typeslno: Joi.number().required(),
    compalint_priority: Joi.number().required(),
    compalint_status: Joi.number().required(),
    complaint_hicslno: Joi.optional(),
    complaint_slno: Joi.number().optional(),
    compalint_date: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
    complaint_remark: Joi.number().optional()
})


const validateitemgroup = Joi.object({
    group_name: Joi.string().required(),
    status: Joi.number().required(),
    em_id: Joi.number().required(),
    grp_slno: Joi.number().optional()
})

const validatekotitem = Joi.object({
    item_name: Joi.string().required(),
    grp_slno: Joi.number().required(),
    rate: Joi.number().required(),
    rate_hosp: Joi.number().required(),
    qty: Joi.number().required(),
    unit: Joi.number().required(),
    diet_item: Joi.number().required(),
    status: Joi.number().required(),
    em_id: Joi.number().required(),
    item_slno: Joi.number().optional()

})


const validateDietmenusetting = Joi.object({
    diet_slno: Joi.number().required(),
    order_req: Joi.number().required(),
    em_id: Joi.number().required(),
    status: Joi.number().required(),
    dmenu_slno: Joi.number().optional()
})

const validateNurseStation = Joi.object({
    co_nurse_desc: Joi.string().required(),
    co_ora_nurse: Joi.string().required(),
    em_id: Joi.number().required(),
    co_status: Joi.number().required(),
    co_nurse_slno: Joi.number().optional()
})

const validateuserCreation = Joi.object({
    em_id: Joi.number().required(),
    em_no: Joi.number().required(),
    emp_no: Joi.number().required(),
    em_salutation: Joi.number().required(),
    em_name: Joi.string().required(),
    em_gender: Joi.number().required(),
    em_dob: Joi.date().required(),
    em_doj: Joi.date().required(),
    em_mobile: Joi.number().max(999999999999).required(),
    em_email: Joi.string().email().optional(),
    em_branch: Joi.number().required(),
    em_department: Joi.number().required(),
    em_dept_section: Joi.number().required(),
    em_designation: Joi.number().required(),
    em_status: Joi.number().required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
    emp_username: Joi.string().required(),
    emp_password: Joi.string().required(),
    emp_email: Joi.string().email().optional(),
    emp_status: Joi.number().required(),
    mod_grp_slno: Joi.number().optional(),
    user_group_slno: Joi.number().optional(),
    mod_grp_user_status: Joi.number().optional(),
    mod_grp_user_slno: Joi.number().optional(),
    emp_slno: Joi.number().optional(),
    dept_slno: Joi.number().optional(),
    deptsec_slno: Joi.number().optional(),
})

validationsurvLog = Joi.object({
    we_surv_slno: Joi.number().required(),
    ip_no: Joi.number().required(),
    bd_code: Joi.number().required(),
    room_category: Joi.number().required(),
    bed_type: Joi.number().required(),
    payment_mode: Joi.number().required(),
    package: Joi.number().required(),
    shift_from: Joi.string().required(),
    shift_to: Joi.string().required(),
    Assigned_nurse: Joi.number().required(),
    telephone: Joi.number().optional(),
    geezer: Joi.number().optional(),
    document_status: Joi.string().optional(),
    remarks_we: Joi.string().optional(),
    sfa_mfa: Joi.string().optional()

})


module.exports = {
    validateEmployee,
    validateUserGroup,
    validateDepartment,
    validateDeptSec,
    validateModulemaster,
    validateMenuMaster,
    validateComplaintDept,
    validateComplaintType,
    validateHicPolicy,
    validateAssetType,
    validateRequestType,
    validateModuleGroup,
    validateUserRights,
    validateUserGroupRights,
    validateModuleGroupRight,
    validateComplaintRegist,
    validateBuilding,
    validateFloor,
    validateRoomtype,
    validateUserCreation,
    validateRoomcreation,
    validateSubroomcreation,
    ValidateDietMaster,
    ValidateDietType,
    validateitemgroup,
    validatekotitem,
    validateDietmenusetting,
    validateNurseStation,
    validateuserCreation,
    validationsurvLog


}