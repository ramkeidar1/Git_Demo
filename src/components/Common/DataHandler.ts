
const LIST_OF_ELEMENTS_IN_JSON = ["configurationManager", "branchSelection", "build", "copyToTarget", "vdd"]
const JSON_URL = 'http://localhost:3000/'


// Define the structure of the configurationManager data
interface ConfigurationManager {
  url: string;
  username: string;
  password: string;
}

// Define the structure of the entire configuration JSON
interface Configuration {
  configurationManager: ConfigurationManager;
  branchSelection: string[];
  build: {
    versionNumber: string;
    command: string;
    outputDirectory: string;
  };
  copyToTarget: {
    targetDirectory: string;
  };
  vdd: {
    versionNumber: string;
    releaseDate: string;
    recentFixes: string[];
  };
}

const retreiveData = async ( valueNumber: number ): Promise<Configuration> => {
  try {

    // Fetch the configuration data from the JSON file
    const response = await fetch(`${JSON_URL}${LIST_OF_ELEMENTS_IN_JSON[valueNumber]}`);
    // console.log(response)
    
    // Check if the response is OK (status is in the 2xx range)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Parse and return the JSON data
    const data = await response.json();
    // console.log('Fetched data:', data);
    
    return data; // Return the fetched data

  } catch (error) {
    // Log any errors and rethrow them
    console.error('Error fetching data:', error);
    throw error; // Ensure the error is thrown to the calling code
  }
};
  
export const loginHandler = async (username: string, password: string): Promise<Array<any>> => {
  try {
    const configuration = await retreiveData(0);
    // Log the configurationManager username and password
    // console.log(`Username: ${configuration.configurationManager.username}, Password: ${configuration.configurationManager.password}`);

    // Check if the username matches
    if (configuration.username !== username) {
        return [1]
      }
  
      // Check if the password matches
      if (configuration.password !== password) {
        return [2]
      }
  
      // If both username and password match, return success
      return [0, configuration.url]
    } catch (error) {
      console.error('Error fetching configuration data:', error);
      return [3]
    }
};

export const branchHandler = async (): Promise<Array<any>> => {
  try {
    const configuration = await retreiveData(1);
    const branchesArray = Object.values(configuration);
    return branchesArray
  } catch (error) {
      console.error('Error fetching configuration data:', error);
      return ['Undefined']
    }
};

export const buildHandler = async (): Promise<any> => {
  try {
    const configuration = await retreiveData(2);
    const buildInfoArray = Object.values(configuration);
    return buildInfoArray
  } catch (error) {
      console.error('Error fetching configuration data:', error);
      return ['Undefined']
    }
};

export const copyHandler = async (): Promise<any> => {
    try {
      const configuration = await retreiveData(3);
      const copyInfoArray = Object.values(configuration);
      return copyInfoArray
    } catch (error) {
        console.error('Error fetching configuration data:', error);
        return ['Undefined']
      }
};

export const GenerateVVDHandler = async (): Promise<any> => {
    try {
      const configuration = await retreiveData(4);
      const versionData = configuration;
      return versionData
    } catch (error) {
        console.error('Error fetching configuration data:', error);
        return ['Undefined']
      }
};

export const addNewBranch = async ( branchName: string) : Promise<number> => {
  try {
    let configuration = await retreiveData(1);
    let newArray = Object.values(configuration)[0]
    if (branchName.length < 1) {return 3}
    if (Array.isArray(newArray)) {
      if (newArray.includes(branchName)) { return 1 };
      
      const updatedBranches = [...newArray, branchName];
      // console.log(updatedBranches)
      
      const response = await fetch(`${JSON_URL}${LIST_OF_ELEMENTS_IN_JSON[1]}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
              branches: updatedBranches,
              "selectedBranch":  branchName
        })
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // console.log("Build info updated successfully");
      return 0;  // Indicating success  
    }
    return 2;
  } catch (error) {
    console.error('Error fetching configuration data:', error);
    return 2
  }
};

export const selectBranch = async ( branchName: string) : Promise<number> => {
  try {
    let configuration = await retreiveData(1);
    const newArray = Object.values(configuration)[0]
    if (branchName.length < 1) {return 2}
    const response = await fetch(`${JSON_URL}${LIST_OF_ELEMENTS_IN_JSON[1]}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
            branches: newArray,
            "selectedBranch":  branchName
      })
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // console.log("Build info updated successfully");
    return 0;  // Indicating success  
  } catch (error) {
    console.error('Error fetching configuration data:', error);
    return 1
  }
};

export const updateBuildInfo = async (versionData: string, buildCommand: string, outputDir: string): Promise<number> => {
  try {
    if (versionData.length < 1 || buildCommand.length < 1 || outputDir.length < 1) {return 2}
    const response = await fetch(`${JSON_URL}${LIST_OF_ELEMENTS_IN_JSON[2]}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "versionNumber": versionData,
        "command": buildCommand,
        "outputDirectory": outputDir
      })
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // console.log("Build info updated successfully");
    return 0;  // Indicating success

  } catch (error) {
    // console.error("Error updating build info:", error);
    return 1;  // Indicating failure
  }
};

export const updateCopyInfo = async (currentTarget: string): Promise<number> => {
  try {
    if (currentTarget.length < 1) {return 2}
    const response = await fetch(`${JSON_URL}${LIST_OF_ELEMENTS_IN_JSON[3]}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "targetDirectory": currentTarget
      })
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // console.log("Build info updated successfully");
    return 0;  // Indicating success

  } catch (error) {
    console.error("Error updating build info:", error);
    return 1;  // Indicating failure
  }
};

export const updateVVDInfo = async (currentDate: string, recentFixes: string[]): Promise<number> => {
  try {

    const responseFromBranch = await retreiveData(1);
    const responseFromBuild = await retreiveData(2);
    const responseFromCopy = await retreiveData(3);

    const response = await fetch(`${JSON_URL}${LIST_OF_ELEMENTS_IN_JSON[4]}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "versionNumber": responseFromBuild.versionNumber,
        "selectedBranch": responseFromBranch.selectedBranch,
        "targetDirectory": responseFromCopy.targetDirectory,
        "releaseDate": currentDate,
        "recentFixes": recentFixes
      }
      )
    });

    

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // console.log("Build info updated successfully");
    return 0;  // Indicating success

  } catch (error) {
    console.error("Error updating build info:", error);
    return 1;  // Indicating failure
  }
};
