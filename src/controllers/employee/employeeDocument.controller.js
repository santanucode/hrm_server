import db from "../../models/index.js";

const { EmployeeDocument } = db;

/* UPLOAD DOCUMENT */
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const document = await EmployeeDocument.create({
      employee_id: req.body.employee_id,
      document_title: req.body.document_title,
      document_type: req.body.document_type,
      file_name: req.file.filename,
      file_path: req.file.path,
      file_size: req.file.size,
      mime_type: req.file.mimetype,
    });

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Document upload failed",
      error: error.message,
    });
  }
};

/* GET DOCUMENTS BY EMPLOYEE */
export const getDocumentsByEmployee = async (req, res) => {
  try {
    const { employee_id } = req.params;

    const documents = await EmployeeDocument.findAll({
      where: { employee_id },
      order: [["uploaded_at", "DESC"]],
    });

    res.json({
      success: true,
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch documents",
      error: error.message,
    });
  }
};

/* DELETE DOCUMENT */
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    await EmployeeDocument.destroy({ where: { id } });

    res.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete document",
      error: error.message,
    });
  }
};

getDocumentsByEmployee.permission = "get_employee_document";
uploadDocument.permission = "upload_employee_document";
deleteDocument.permission = "delete_employee_document";
