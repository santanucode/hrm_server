import db from "../../models/index.js";
const { Employee, EmployeePersonalDetails } = db;

export const updatePersonalDetails = async (req, res) => {
  try {
    const {
      employee_id,
      father_name,
      mother_name,
      marital_status,
      spouse_name,
      nationality,
      blood_group,
      emergency_contact_name,
      emergency_contact_phone,
      aadhar_number,
      pan_number,
      current_address,
      permanent_address,
    } = req.body;

    /* -------- Validate Employee -------- */
    const employee = await Employee.findByPk(employee_id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    /* -------- Create or Update Personal Details -------- */
    const [details, created] =
      await EmployeePersonalDetails.findOrCreate({
        where: { employee_id },
        defaults: {
          father_name,
          mother_name,
          marital_status,
          spouse_name,
          nationality,
          blood_group,
          emergency_contact_name,
          emergency_contact_phone,
          aadhar_number,
          pan_number,
          current_address,
          permanent_address,
        },
      });

    if (!created) {
      await details.update({
        father_name,
        mother_name,
        marital_status,
        spouse_name,
        nationality,
        blood_group,
        emergency_contact_name,
        emergency_contact_phone,
        aadhar_number,
        pan_number,
        current_address,
        permanent_address,
      });
    }

    /* -------- Update Employee Progress -------- */
    await employee.update({
      current_step: 4,
      is_completed: false,
    });

    return res.status(200).json({
      success: true,
      message: "Personal details saved successfully",
      employee_id,
      next_step: 5,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to save personal details",
      error: error.message,
    });
  }
};

/* -------- Permission Key -------- */
updatePersonalDetails.permission = "update_employee_personal_details";
