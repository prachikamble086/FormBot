// DashboardPage.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postFolderRequest } from "../../services/networkCalls";

function DashboardPage() {
  const { dashboardId } = useParams();
  const navigate = useNavigate();
  const [folderTitle, setFolderTitle] = useState("");

  const handleCreateFolder = async () => {
    try {
      const requestUserId = localStorage.getItem("userId");

      if (!requestUserId) {
        console.error("User is not logged in.");
        return;
      }

      const response = await postFolderRequest(
        dashboardId,
        requestUserId,
        folderTitle,
        []
      );

      console.log("Folder created successfully:", response);
      setFolderTitle("");
      navigate(`/dashboard/${dashboardId}`);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard {dashboardId}</h1>

      <input
        type="text"
        value={folderTitle}
        onChange={(e) => setFolderTitle(e.target.value)}
        placeholder="Enter folder title"
      />
      <button onClick={handleCreateFolder}>Create Folder</button>
    </div>
  );
}

export default DashboardPage;
