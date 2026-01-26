import db from "../../models/index.js";
const { EmployeeExperience } = db;

/* CREATE */
export const addExperience = async (req, res) => {
  try {
    console.log(req.body)
    const experience = await EmployeeExperience.create(req.body);

    res.status(201).json({
      success: true,
      message: "Experience added successfully",
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add experience",
      error: error.message,
    });
  }
};

/* GET BY EMPLOYEE */
export const getExperienceByEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params;

    const experiences = await EmployeeExperience.findAll({
      where: { employee_id },
      order: [["start_date", "DESC"]],
    });

    res.json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
      error: error.message,
    });
  }
};

/* UPDATE */
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await EmployeeExperience.update(req.body, {
      where: { id },
    });

    res.json({
      success: true,
      message: "Experience updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update experience",
      error: error.message,
    });
  }
};

/* DELETE */
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    await EmployeeExperience.destroy({ where: { id } });

    res.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete experience",
      error: error.message,
    });
  }
};

getExperienceByEmployee.permission = "get_employee_experience";
addExperience.permission = "add_employee_experience";
updateExperience.permission = "update_employee_experience";
deleteExperience.permission = "delete_employee_experience";
