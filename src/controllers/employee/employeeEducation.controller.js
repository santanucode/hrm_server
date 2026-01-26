import db from "../../models/index.js";
const { Employee, EmployeeEducation } = db;

/**
 * STEP 5: EDUCATION DETAILS
 */
export const addEducationDetails = async (req, res) => {
  try {
    const { employee_id, education } = req.body;

    const employee = await Employee.findByPk(employee_id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (!Array.isArray(education) || education.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Education details are required",
      });
    }

    const records = education.map((edu) => ({
      employee_id,
      qualification: edu.qualification,
      institute: edu.institute,
      board_university: edu.board_university,
      year_of_passing: edu.year_of_passing,
      percentage: edu.percentage,
    }));

    await EmployeeEducation.bulkCreate(records);

    await employee.update({
      current_step: 5,
      is_completed: false,
    });

    return res.status(200).json({
      success: true,
      message: "Education details saved successfully",
      employee_id,
      next_step: 6,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save education details",
      error: error.message,
    });
  }
};

export const updateEducation = async (req, res) => {
  const { id } = req.params;

  const record = await EmployeeEducation.findByPk(id);
  if (!record) return res.status(404).json({ message: "Education not found" });

  await record.update(req.body);
  res.json({ success: true });
};

export const deleteEducation = async (req, res) => {
  await EmployeeEducation.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: "Deleted" });
};

addEducationDetails.permission = "add_employee_education";
updateEducation.permission = "update_employee_education";
deleteEducation.permission = "delete_employee_education";
