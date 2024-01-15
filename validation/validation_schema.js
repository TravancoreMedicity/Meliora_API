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
    user_grp_slno: Joi.optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
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
    dept_type: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

// campus master validation Room Management
const validateCampus = Joi.object({
    rm_campus_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Campus Name is Required',
            'string.min': 'Campus Name length must be at least 3 characters long',
            'string.max': 'Campus Name length must be less than or equal to 45 characters long'
        }),
    rm_campus_status: Joi.number().min(0).max(1).required(),
    rm_campus_alias: Joi.string().optional()
        .messages({
            'string.empty': 'Alias is Required',
            'string.min': 'Campus Alias Name length must be at least 3 characters long',
            // 'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
        }),
    rm_campus_no: Joi.string().required()
        .messages({
            'string.empty': 'Campus Number is Required',
            'string.min': 'Campus Number length must be at least 3 characters long',

        }),
    rm_campus_slno: Joi.optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional()

});

// Room Category master validation Room Management
const validateRoomCategory = Joi.object({
    rm_roomcategory_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Room Category Name is Required',
            'string.min': 'Room Category Name length must be at least 3 characters long',
            'string.max': 'Room Category Name length must be less than or equal to 45 characters long'
        }),
    rm_roomcategory_status: Joi.number().min(0).max(1).required(),
    rm_roomcategory_alias: Joi.string().optional()
        .messages({
            'string.empty': 'Alias is Required',
            'string.min': 'Room Category Alias Name length must be at least 3 characters long',
            // 'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
        }),
    rm_roomcategory_no: Joi.string().required()
        .messages({
            'string.empty': 'Room Category Number is Required',
            'string.min': 'Room Category Number length must be at least 3 characters long',

        }),
    rm_roomcategory_slno: Joi.optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional()

});
//building master validation Room management
const validateBuildingMast = Joi.object({
    rm_building_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Building Name is Required',
            'string.min': 'Building Name length must be at least 3 characters long',
            'string.max': 'Building Name length must be less than or equal to 45 characters long'
        }),
    rm_building_status: Joi.number().min(0).max(1).required(),
    rm_building_alias: Joi.string().optional()
        .messages({
            'string.empty': 'Alias is Required',
            'string.min': 'Building Alias Name length must be at least 3 characters long',
            // 'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
        }),
    rm_building_no: Joi.string().required()
        .messages({
            'string.empty': 'Building Number is Required',
            'string.min': 'Building Number length must be at least 3 characters long',

        }),
    rm_building_slno: Joi.optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional()

});

//building block master validation Room management
const validateBuildBlock = Joi.object({
    rm_buildblock_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Building block Name is Required',
            'string.min': 'Building block Name length must be at least 3 characters long',
            'string.max': 'Building block Name length must be less than or equal to 45 characters long'
        }),
    rm_buildblock_status: Joi.number().min(0).max(1).required(),
    rm_buildblock_alias: Joi.string().optional()
        .messages({
            'string.empty': 'Alias is Required',
            'string.min': 'Building block Alias Name length must be at least 3 characters long',
            // 'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
        }),
    rm_buildblock_no: Joi.string().required()
        .messages({
            'string.empty': 'Building block Number is Required',
            'string.min': 'Building block Number length must be at least 3 characters long',

        }),
    rm_buildblock_slno: Joi.optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional()

});
// Inside building block master validation Room management
const validateInsideBuildingBlock = Joi.object({
    rm_insidebuildblock_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Inside Building block Name is Required',
            'string.min': 'Inside Building block Name length must be at least 3 characters long',
            'string.max': 'Inside Building block Name length must be less than or equal to 45 characters long'
        }),
    rm_insidebuildblock_status: Joi.number().min(0).max(1).required(),
    rm_insidebuildblock_alias: Joi.string().optional()
        .messages({
            'string.empty': 'Alias is Required',
            'string.min': 'Inside Building block Alias Name length must be at least 3 characters long',
            // 'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
        }),
    rm_insidebuildblock_no: Joi.string().required()
        .messages({
            'string.empty': 'Inside Building block Number is Required',
            'string.min': 'Inside Building block Number length must be at least 3 characters long',

        }),
    rm_insidebuildblock_slno: Joi.number().optional()

});
//Floor master validation Room management
const validateFloor = Joi.object({
    rm_roomcategory_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Room Category Name is Required',
            'string.min': 'Room Category Name length must be at least 3 characters long',
            'string.max': 'Room Category Name length must be less than or equal to 45 characters long'
        }),
    rm_roomcategory_status: Joi.number().min(0).max(1).required(),
    rm_roomcategory_alias: Joi.string().optional()
        .messages({
            'string.empty': 'Alias is Required',
            'string.min': 'Room Category Alias Name length must be at least 3 characters long',
            // 'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
        }),
    rm_roomcategory_no: Joi.string().required()
        .messages({
            'string.empty': 'Room Category Number is Required',
            'string.min': 'Room Category Number length must be at least 3 characters long',

        }),
    rm_roomcategory_slno: Joi.optional(),

});



//Room Type master validation Room management
const validateRoomTypeMast = Joi.object({
    rm_roomtype_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Room type Name is Required',
            'string.min': 'Room type Name length must be at least 3 characters long',
            'string.max': 'Room type Name length must be less than or equal to 45 characters long'
        }),
    rm_roomtype_status: Joi.number().min(0).max(1).required(),
    rm_roomtype_alias: Joi.string().optional()
        .messages({
            'string.empty': 'Alias is Required',
            'string.min': 'Room type Alias Name length must be at least 3 characters long',
            // 'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
        }),
    rm_roomtype_no: Joi.string().required()
        .messages({
            'string.empty': 'Room type Number is Required',
            'string.min': 'Room type Number length must be at least 3 characters long',

        }),
    rm_roomtype_slno: Joi.optional(),
    rm_roomtype_type: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional()
});

//Floor creation validation room management 
const validateFloors = Joi.object({
    rm_floor_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Room type Name is Required',
            'string.min': 'Room type Name length must be at least 3 characters long',
            'string.max': 'Room type Name length must be less than or equal to 45 characters long'
        }),
    rm_floor_status: Joi.number().min(0).max(1).required(),
    rm_floor_alias: Joi.string().optional()
        .messages({
            'string.empty': 'Alias is Required',
            'string.min': 'Room type Alias Name length must be at least 3 characters long',
            // 'string.max': 'Department Section Name length must be less than or equal to 45 characters long'
        }),
    rm_floor_no: Joi.string().required()
        .messages({
            'string.empty': 'Room type Number is Required',
            'string.min': 'Room type Number length must be at least 3 characters long',

        }),
    rm_floor_slno: Joi.optional(),

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
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
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
const validateFloorCreations = Joi.object({
    floor_desc: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Floor Description is Required',
            'string.min': 'Floor Description length must be at least 3 characters long',
            'string.max': 'Floor Description length must be less tahn or equal to 45 characters long'
        }),
    floor_code: Joi.number().optional(),
    build_code: Joi.number().optional(),
    floor_number: Joi.string().optional(),
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

//Escalation Time Master
const validateEscalationtime = Joi.object({
    esc_activity: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Activity Name  is Required',
            'string.min': 'Activity Name must be at least 3 characters long',
            'string.max': 'Activity Name  length must be less tahn or equal to 45 characters long'
        }),
    esc_responsibility: Joi.string().trim().uppercase().min(2).max(45).required()
        .messages({
            'string.empty': 'Responsibility Name  is Required',
            'string.min': 'Responsibility Name must be at least 3 characters long',
            'string.max': 'Responsibility Name  length must be less tahn or equal to 45 characters long'
        }),
    esc_slno: Joi.optional(),
    esc_time_limit: Joi.optional(),
    esc_lvl1: Joi.optional(),
    esc_lvl2: Joi.optional(),
    esc_lvl3: Joi.optional(),
    esc_lvl4: Joi.optional(),
    esc_top_lvl: Joi.optional(),
    esc_top_lvl: Joi.optional(),
    esc_status: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
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

    complaint_dept_secslno: Joi.number().required(),
    complaint_request_slno: Joi.number().required(),
    complaint_deptslno: Joi.number().optional(),
    complaint_typeslno: Joi.number().required(),
    complaint_desc: Joi.string().required().messages({
        'string.empty': 'Complaint Description is Required'
    }),
    compalint_priority: Joi.number().optional(),
    compalint_status: Joi.number().optional(),
    complaint_hicslno: Joi.optional(),
    complaint_slno: Joi.number().optional(),
    compalint_date: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
    complaint_remark: Joi.number().optional(),
    cm_location: Joi.number().optional(),
    locationName: Joi.string().optional(),
    priority: Joi.string().optional(),
    priority_reason: Joi.optional(),
    priority_check: Joi.number().optional(),
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
    rate: Joi.number().optional(),
    rate_hosp: Joi.number().optional(),
    qty: Joi.string().optional(),
    unit: Joi.string().optional(),
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
    co_nurse_slno: Joi.number().optional(),
    co_nurse_desc: Joi.string().required(),
    co_ora_nurse: Joi.string().required(),
    em_id: Joi.number().required(),
    co_status: Joi.number().optional(),
    ns_building: Joi.number().required(),
    ns_floor: Joi.number().required(),
    ns_ora_outlet: Joi.string().optional()
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
    empdtl_slno: Joi.number().optional(),
    supervisor: Joi.number().optional(),
    comp_type_map: Joi.optional()
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
    sfa_mfa: Joi.string().optional(),
    discharge_wright: Joi.date().optional(),
    bill_ready: Joi.date().optional(),
    actual_discharge: Joi.date().optional(),
    recieved_time: Joi.date().optional(),
    tv_ac_remot: Joi.optional(),
    dietition_visit_tme: Joi.date().optional(),
    stat_medicine: Joi.date().optional(),
    stat_recived_time: Joi.date().optional(),
    we_employee: Joi.number().optional(),
    submit_time: Joi.date().optional(),
    room_amentites: Joi.optional(),
    pateint_service: Joi.optional()
})

validationdailyactivity = Joi.object({
    srv_slno: Joi.number().required(),
    activity_date: Joi.date().required(),
    activity_time: Joi.date().required(),
    room_clean: Joi.number().optional(),
    sheet_change: Joi.number().optional(),
    dr_round: Joi.number().optional(),
    imortant_note: Joi.optional(),
    dietian_round: Joi.number().optional(),
    bill_audit: Joi.number().optional(),
    patient_board_update: Joi.number().optional(),
    insurance_status: Joi.number().optional(),
    create_empid: Joi.number().optional(),
    update_date: Joi.number().optional(),
    ip_no: Joi.string().required(),
    diet_status: Joi.optional(),
    asset_usage: Joi.optional(),
    dr_visit_time: Joi.optional()

})

validationpatientIntraction = Joi.object({
    surv_slno: Joi.number().required(),
    remark_date: Joi.date().required(),
    particular: Joi.string().required(),
    status: Joi.string().required(),
    remarks: Joi.optional(),
    submit_time: Joi.date().optional(),
    edit_time: Joi.string().optional(),
    submit_employee: Joi.number().optional(),
    remark_time: Joi.date().required()

})

validationhighbiotic = Joi.object({
    high_item_code: Joi.string().required(),
    high_item_desc: Joi.string().required(),
    high_item_alias: Joi.string().max(4).optional().messages({
        'string.max': 'Hicpolicy Name length must be less than or equal to 4 characters long'
    }),
    high_item_status: Joi.number().optional()
})


ValidationEmpMappingNurStation = Joi.object({
    map_dept_slno: Joi.number().required(),
    map_deptsec_slno: Joi.number().required(),
    map_emp_id: Joi.number().required(),
    map_building: Joi.number().required(),
    map_floor: Joi.number().required(),
    create_user: Joi.number().required(),
    edit_user: Joi.number().optional(),
    create_date: Joi.date().optional(),
    update_date: Joi.date().optional(),
    map_status: Joi.number().optional(),
    map_nsurse_station: Joi.required()
})
validateBedTransfer = Joi.object({
    trasf_slno: Joi.number().required(),
    bed_trans_surv_slno: Joi.number().required(),
    trasfer_to: Joi.string().required(),
    transfer_time: Joi.date().required(),
    counseling_status: Joi.string().optional(),
    sfa_mfa_clearence: Joi.string().optional(),
    room_amenties: Joi.optional(),
    bystander_room_retain: Joi.string().optional(),
    transfer_in_time: Joi.date().optional(),
    remarks: Joi.string().optional(),
    ip_no: Joi.string().required()

})


validatedischargeEvent = Joi.object({
    // dis_slno: Joi.number().optional(),
    surv_slno: Joi.number().required(),
    ip_no: Joi.string().required(),
    discharge_type: Joi.optional(),
    cros_consult: Joi.optional(),
    summary_time: Joi.optional(),
    disc_medicine_indent: Joi.optional(),
    disc_medicine_recive: Joi.optional(),
    feed_back_collected: Joi.number().optional(),
    room_clear_time: Joi.optional(),
    disc_key: Joi.number().optional(),
    disc_callbell: Joi.number().optional(),
    disc_tv_ac_remot: Joi.optional(),
    disc_report_date: Joi.optional(),
    act_dis_report_date: Joi.optional(),
    dis_entry_time: Joi.optional(),
    act_dis_entry_time: Joi.optional(),
    dmd_date: Joi.optional(),
    act_dmd_date: Joi.optional(),
    disc_date: Joi.optional(),
    act_disc_date: Joi.optional(),
    act_disc_status: Joi.number().optional(),
})

const validateRequestRegister = Joi.object({
    actual_requirement: Joi.string().required().messages({
        'string.empty': 'Actual Requirement  is Required'
    }),
    needed: Joi.optional(),
    request_dept_slno: Joi.number().min(1).required().messages({
        'string.empty': 'Select Department'
    }),
    request_deptsec_slno: Joi.number().min(1).required().messages({
        'string.empty': 'Select Department Section'
    }),
    location: Joi.optional(),
    create_user: Joi.number().optional(),
    remarks: Joi.optional(),
    total_approx_cost: Joi.number().optional(),
    expected_date: Joi.date().optional(),
    user_deptsec: Joi.number().optional(),
    req_slno: Joi.number().optional(),
    edit_user: Joi.number().optional(),
    category: Joi.optional(),
    emergency: Joi.number().optional(),
})


const validateRequestRegisterDetl = Joi.object({
    req_slno: Joi.number().required(),
    item_slno: Joi.number().required(),
    item_desc: Joi.string().required(),
    item_unit: Joi.number().required(),
    item_qnty: Joi.number().required(),
    item_specification: Joi.string().required(),
    aprox_cost: Joi.number().required(),
    item_status: Joi.number().required(),
    create_user: Joi.number().optional(),

})

const validateOmTableMast = Joi.object({
    omtable_name: Joi.string().required(),
    om_dept_slno: Joi.number().required(),
    om_dept_sec_slno: Joi.number().required(),
    omtable_emp_id: Joi.number().required(),
    omtable_status: Joi.number().required(),
    omtable_no: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),

})

const validateOmEmpmapping = Joi.object({
    om_table_slno: Joi.number().required(),
    om_emp_deptno: Joi.number().required(),
    om_emp_deptsec_no: Joi.number().required(),
    om_emp_id: Joi.number().required(),
    om_emp_status: Joi.number().required(),
    om_emp_slno: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),

})

const validateComEmpmapping = Joi.object({
    map_section_name: Joi.string().required(),
    co_emp_dept: Joi.number().required(),
    co_emp_deptsec: Joi.number().required(),
    co_emp_empid: Joi.required(),
    co_emp_status: Joi.number().required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
    emp_map_slno: Joi.number().optional(),
    com_dept: Joi.number().required(),

})


const ValidatePrority = Joi.object({
    cm_priority_desc: Joi.string().required(),
    cm_priority_status: Joi.number().required(),
    create_user: Joi.number().optional(),
    escalation_min: Joi.number().optional(),
    escalation_max: Joi.number().optional(),
    edit_user: Joi.number().optional(),
    cm_priority_slno: Joi.number().optional(),

})


//Asset Type Validation in item creation
const validateAssetType = Joi.object({
    asset_type_name: Joi.string().trim().uppercase().min(1).max(45).required()
        .messages({
            'string.empty': 'Asset Name  Required',
            'string.min': 'Asset Name length must be at least 3 characters long',
            'string.max': 'Asset Name length must be less than or equal to 45 characters long'
        }),
    asset_type_slno: Joi.number().optional(),
    asset_type_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

//Item Type Validation in item creation
const validateItemType = Joi.object({
    item_type_name: Joi.string().trim().uppercase().min(1).max(45).required()
        .messages({
            'string.empty': 'Item Name  Required',
            'string.min': 'Item Name length must be at least 3 characters long',
            'string.max': 'Item Name length must be less than or equal to 45 characters long'
        }),
    item_type_slno: Joi.number().optional(),
    item_type_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

//Category Validation in item creation
const validateCategoryCreate = Joi.object({
    category_name: Joi.string().trim().uppercase().min(1).max(45).required()
        .messages({
            'string.empty': 'Category  Required',
            'string.min': 'Category length must be at least 3 characters long',
            'string.max': 'Category length must be less than or equal to 45 characters long'
        }),
    category_slno: Joi.number().optional(),
    category_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});


//SubCategory Validation in item creation
const validateSubcategoryCreate = Joi.object({
    subcategory_name: Joi.string().trim().uppercase().min(1).max(45).required()
        .messages({
            'string.empty': 'Subcategory  Required',
            'string.min': 'Subcategory length must be at least 3 characters long',
            'string.max': 'Subcategory length must be less than or equal to 45 characters long'
        }),
    subcategory_slno: Joi.number().optional(),
    subcategory_status: Joi.number().min(0).max(1).required(),
    category_slno: Joi.required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

//group Validation in item creation
const validateGroupCreate = Joi.object({
    group_name: Joi.string().trim().uppercase().min(1).max(45).required()
        .messages({
            'string.empty': 'Group  Required',
            'string.min': 'Group length must be at least 3 characters long',
            'string.max': 'Group length must be less than or equal to 45 characters long'
        }),
    group_slno: Joi.number().optional(),
    group_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

//subgroup Validation in item creation
const validateSubGroupCreate = Joi.object({
    sub_group_name: Joi.string().trim().uppercase().min(1).max(45).required()
        .messages({
            'string.empty': 'Subgroup  Required',
            'string.min': 'Subgroup length must be at least 3 characters long',
            'string.max': 'Subgroup length must be less than or equal to 45 characters long'
        }),
    subgroup_slno: Joi.number().optional(),
    sub_group_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
    group_slno: Joi.required(),
});

//model Validation in item creation
const validateModelCreate = Joi.object({
    model_name: Joi.string().trim().uppercase().min(1).max(45).required()
        .messages({
            'string.empty': 'Model  Required',
            'string.min': 'Model length must be at least 3 characters long',
            'string.max': 'Model length must be less than or equal to 45 characters long'
        }),
    model_slno: Joi.number().optional(),
    model_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});
//Manufacture Validation in item creation
const validateManufactureCreate = Joi.object({
    manufacture_name: Joi.string().trim().uppercase().min(1).max(45).required()
        .messages({
            'string.empty': 'Manufacture  Required',
            'string.min': 'Manufacture length must be at least 3 characters long',
            'string.max': 'Manufacture length must be less than or equal to 45 characters long'
        }),
    manufacture_slno: Joi.number().optional(),
    manufacture_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});
//uom Validation in item creation
const validateUOMCreate = Joi.object({
    uom_name: Joi.string().trim().uppercase().min(1).max(45).required()
        .messages({
            'string.empty': 'Unit of Measurement  Required',
            'string.min': 'Unit of Measurement length must be at least 3 characters long',
            'string.max': 'Unit of Measurement length must be less than or equal to 45 characters long'
        }),
    uom_slno: Joi.number().optional(),
    uom_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});
//sumodel Validation in item creation
const validateSubModelCreate = Joi.object({
    submodel_name: Joi.string().trim().uppercase().min(1).max(45).required()
        .messages({
            'string.empty': 'Submodel  Required',
            'string.min': 'Submodel length must be at least 3 characters long',
            'string.max': 'Submodel length must be less than or equal to 45 characters long'
        }),
    submodel_slno: Joi.number().optional(),
    submodel_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
    model_slno: Joi.required()
});

// validateCommunicationCreate Validation in item creation

const validateCommunicationCreate = Joi.object({
    reciver_name: Joi.string().trim().uppercase().optional(),
    contact_no: Joi.number().optional(),
    ima: Joi.string().optional(),
    sim_number: Joi.string().optional(),
    provider: Joi.number().optional(),
    issue_date: Joi.optional(),
    asset_no: Joi.string().optional(),
    tarrif: Joi.number().optional(),
    amount: Joi.number().optional(),
    device_type_slno: Joi.number().required(),
    department: Joi.number().required(),
    location: Joi.number().optional(),
    device_ima: Joi.string().optional(),
    device_num: Joi.string().optional(),
    sim_mobile_num: Joi.number().min(10).max(10).optional(),
    receiver_emp_id: Joi.string().optional(),
    device_name: Joi.string().required(),
    issue_status: Joi.number().min(0).max(1).required(),
    sim_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional()
});


//item creation Validation in item creation
const validateItemCreate = Joi.object({
    item_name: Joi.string().required(),
    item_asset_type_slno: Joi.number().required(),
    item_type_slno: Joi.number().required(),
    item_category_slno: Joi.optional(),
    item_subcategory_slno: Joi.optional(),
    item_group_slno: Joi.optional(),
    item_subgroup_slno: Joi.optional(),
    item_model_slno: Joi.optional(),
    item_submodel_slno: Joi.optional(),
    item_uom_slno: Joi.optional(),
    item_manufactures_slno: Joi.optional(),
    item_base_name: Joi.optional(),
    item_model_num: Joi.optional(),
    item_specific_one: Joi.optional(),
    item_specific_two: Joi.optional(),
    item_creation_status: Joi.number().min(0).max(1).required(),
    asset_spare: Joi.number().required(),
});

//Backup ScheduleType Validation
const validateScheduleTypeCreate = Joi.object({
    schedule_type_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Schedule Type Required',
            'string.min': 'Schedule Type length must be at least 3 characters long',
            'string.max': 'Schedule Type length must be less than or equal to 45 characters long'
        }),
    schedule_type_id: Joi.number().optional(),
    schedule_type_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});


//Backup ScheduleTime Validation 
const validateScheduleTimeCreate = Joi.object({
    schedule_time_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Schedule Time Required',
            'string.min': 'Schedule Time length must be at least 3 characters long',
            'string.max': 'Schedule Time length must be less than or equal to 45 characters long'
        }),
    schedule_time_id: Joi.number().optional(),
    schedule_time_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

//Backup PhysicalLocation Validation 
const validatePhysicalLocationcreate = Joi.object({
    location_name: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Location Name Required',
            'string.min': 'Location Name length must be at least 3 characters long',
            'string.max': 'Location Namelength must be less than or equal to 45 characters long'
        }),
    location_id: Joi.number().optional(),
    location_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});


//Backup Selected Days Validation 
const validateSelectedDayscreate = Joi.object({
    selected_days: Joi.string().trim().uppercase().min(3).max(45).required()
        .messages({
            'string.empty': 'Number Of Days Required',
            'string.min': 'Number Of Days length must be at least 3 characters long',
            'string.max': 'Number Of Days must be less than or equal to 45 characters long'
        }),
    selected_days_value: Joi.number().optional(),
    selected_days_id: Joi.number().optional(),
    days_status: Joi.number().min(0).max(1).required(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});


//BAckup Details Validation
const validateBackupDetails = Joi.object({
    backup_slno: Joi.number().optional(),
    backup_type: Joi.required(),
    backup_name: Joi.required(),
    backup_location: Joi.required(),
    backup_device_ip: Joi.required(),
    backup_device_name: Joi.required(),
    backup_device_location: Joi.required(),
    transferred_device_ip: Joi.optional(),
    transferred_device_name: Joi.optional(),
    transferred_device_location: Joi.optional(),
    backup_schedule_type: Joi.required(),
    backup_schedule_time: Joi.optional(),
    selected_days: Joi.optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

// Backup Verification
const validateBackupVerification = Joi.object({
    daily_slno: Joi.number().optional(),
    backup_date_time: Joi.date().required(),
    backup_size_before: Joi.number().optional(),
    backup_size_after: Joi.number().optional(),
    em_id: Joi.number().required(),
    remarks: Joi.optional(),
    verify_status: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

const validateMonthBackupVerification = Joi.object({
    monthly_slno: Joi.number().optional(),
    backup_date_time: Joi.date().required(),
    backup_size_before: Joi.number().optional(),
    backup_size_after: Joi.number().optional(),
    em_id: Joi.number().required(),
    remarks: Joi.optional(),
    verify_status: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

const validateWeekBackupVerification = Joi.object({
    weekly_slno: Joi.number().optional(),
    backup_date_time: Joi.date().required(),
    backup_size_before: Joi.number().optional(),
    backup_size_after: Joi.number().optional(),
    em_id: Joi.number().required(),
    remarks: Joi.optional(),
    verify_status: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

const validateYearBackupVerification = Joi.object({
    yearly_slno: Joi.number().optional(),
    backup_date_time: Joi.date().required(),
    backup_size_before: Joi.number().optional(),
    backup_size_after: Joi.number().optional(),
    em_id: Joi.number().required(),
    remarks: Joi.optional(),
    verify_status: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

const validateSelectedDaysBackupVerification = Joi.object({
    days_slno: Joi.number().optional(),
    backup_date_time: Joi.date().required(),
    backup_size_before: Joi.number().optional(),
    backup_size_after: Joi.number().optional(),
    em_id: Joi.number().required(),
    remarks: Joi.optional(),
    verify_status: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
});

const validateAssetRackMaster = Joi.object({

    am_rack_name: Joi.string().trim().uppercase().required(),
    am_rack_status: Joi.number().optional(),
    create_user: Joi.number().optional(),
    edit_user: Joi.number().optional(),
    am_rack_slno: Joi.number().optional()
});

module.exports = {
    validateFloors,
    validateRoomCategory,
    validateInsideBuildingBlock,
    validateRoomTypeMast,
    validateBuildBlock,
    validateBuildingMast,
    validateCampus,
    validateEmployee,
    validateUserGroup,
    validateDepartment,
    validateDeptSec,
    validateModulemaster,
    validateMenuMaster,
    validateComplaintDept,
    validateComplaintType,
    validateHicPolicy,
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
    validationsurvLog,
    validationpatientIntraction,
    validationdailyactivity,
    validateEscalationtime,
    validationhighbiotic,
    ValidationEmpMappingNurStation,
    validateBedTransfer,
    validatedischargeEvent,
    validateRequestRegister,
    validateRequestRegisterDetl,
    validateOmTableMast,
    validateOmEmpmapping,
    validateComEmpmapping,
    ValidatePrority,
    validateAssetType,
    validateItemType,
    validateCategoryCreate,
    validateSubcategoryCreate,
    validateGroupCreate,
    validateSubGroupCreate,
    validateModelCreate,
    validateManufactureCreate,
    validateUOMCreate,
    validateSubModelCreate,
    validateItemCreate,
    validateScheduleTypeCreate,
    validateScheduleTimeCreate,
    validateBackupDetails,
    validatePhysicalLocationcreate,
    validateBackupVerification,
    validateSelectedDayscreate,
    validateMonthBackupVerification,
    validateWeekBackupVerification,
    validateYearBackupVerification,
    validateSelectedDaysBackupVerification,
    validateCommunicationCreate,
    validateAssetRackMaster


}