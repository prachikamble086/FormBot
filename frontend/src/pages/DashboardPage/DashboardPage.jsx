import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../context/context";
import {
  postFolderRequest,
  getDashboardDetailsRequest,
  postFormRequest,
} from "../../services/networkCalls";
import ThemeToggle from "../../../components/themes/themes";

function DashboardPage() {
  const { dashboardId } = useParams(); // Get dashboard ID from the URL
  const { folder, setFolder, forms, setForms } = useAppContext();
  const [loadingFolders, setLoadingFolders] = useState(false);
  const [loadingForms, setLoadingForms] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  const navigate = useNavigate();

  // Check for user authentication before loading the page
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      console.error("User is not logged in.");
      navigate("/login"); // Redirect to the login page
    }
  }, [navigate]);

  const handleSettings = () => {
    const userId = localStorage.getItem("userId");
    console.log("User ID in localStorage:", localStorage.getItem("userId"));
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      try {
        setLoadingFolders(true);
        const requestUserId = localStorage.getItem("userId");
        console.log(requestUserId);
        if (!requestUserId) {
          console.error("User is not logged in.");
          return;
        }

        const dashboardDetails = await getDashboardDetailsRequest(
          dashboardId,
          requestUserId
        );
        setFolder(dashboardDetails.folders || []);
        setForms(dashboardDetails.forms || []);
      } catch (error) {
        console.error("Error fetching dashboard details:", error);
      } finally {
        setLoadingFolders(false);
      }
    };

    fetchDashboardDetails();
  }, [dashboardId, setFolder, setForms]);

  const handleCreateFolder = async () => {
    try {
      const requestUserId = localStorage.getItem("userId");
      if (!requestUserId) {
        console.error("User is not logged in.");
        return;
      }

      const postFolder = await postFolderRequest(
        dashboardId,
        requestUserId,
        folderTitle,
        []
      );
      console.log("Folder created successfully:", postFolder);
      setFolderTitle("");

      const updatedPostFolder = await getDashboardDetailsRequest(
        dashboardId,
        requestUserId
      );
      setFolder(updatedPostFolder.folders || []);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const handleCreateForm = async () => {
    try {
      const requestUserId = localStorage.getItem("userId");
      if (!requestUserId) {
        console.error("User is not logged in.");
        return;
      }

      if (!formTitle) {
        console.error("Form title cannot be empty.");
        return;
      }

      const postForm = await postFormRequest(
        dashboardId,
        requestUserId,
        formTitle
      );
      console.log("Form created successfully:", postForm);
      setFormTitle("");

      const updatedPostForm = await getDashboardDetailsRequest(
        dashboardId,
        requestUserId
      );
      setForms(updatedPostForm.forms || []);
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  return (
    <div>
      <ThemeToggle />
      <h1>Dashboard {dashboardId}</h1>
      <button onClick={handleSettings}>Settings</button>

      <div>
        <input
          type="text"
          value={folderTitle}
          onChange={(e) => setFolderTitle(e.target.value)}
          placeholder="Enter folder title"
        />
        <button onClick={handleCreateFolder}>Create Folder</button>
      </div>

      {loadingFolders ? (
        <p>Loading folders...</p>
      ) : (
        <div>
          <h2>Folders</h2>
          <ul>
            {folder?.length > 0 ? (
              folder.map((f) => (
                <li key={f._id}>
                  <button
                    onClick={() => {
                      setSelectedFolder(f);
                    }}
                  >
                    {f.title}
                  </button>
                </li>
              ))
            ) : (
              <p>No folders found</p>
            )}
          </ul>
        </div>
      )}

      <div>
        <h2>Create New Form</h2>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Enter form title"
        />
        <button onClick={handleCreateForm}>Create Form</button>
      </div>

      <div>
        <h2>Forms</h2>
        {loadingForms ? (
          <p>Loading forms...</p>
        ) : (
          <ul>
            {forms?.length > 0 ? (
              forms.map((form) => (
                <li key={form._id}>
                  <button>
                    <p>{form.title}</p>
                  </button>
                </li>
              ))
            ) : (
              <p>No forms found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
