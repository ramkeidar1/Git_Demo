const JSON_URL = 'http://localhost:3000/'


// The structure of the entire configuration JSON
interface Configuration {
  configurationManager: {
    url: string;
    username: string;
    password: string;
  };
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

//Access the JSON server and extracts the data
const retreiveData = async ( wantedExtension: string ): Promise<Configuration> => {
  try {

    // Fetch the configuration data from the JSON file
    const response = await fetch(`${JSON_URL}${wantedExtension}`);
    
    // Check if the response is OK (status is in the 2xx range)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Parse and return the JSON data
    const data = await response.json();
    
    return data; // Return the fetched data

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Ensure the error is thrown to the calling code
  }
};
  
export const loginHandler = async (username: string, password: string): Promise<Array<any>> => {
  try {
    const configuration = await retreiveData('configurationManager');
    // Log the configurationManager username and password

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

//Extracting the data of the element 'branchSelection' from the JSON and returns it at a list
export const branchHandler = async (): Promise<Array<any>> => {
  try {
    const configuration = await retreiveData("branchSelection");
    const branchesArray = Object.values(configuration);
    return branchesArray
  } catch (error) {
      console.error('Error fetching configuration data:', error);
      return ['Undefined']
    }
};


//Extracting the data of the element 'build' from the JSON and returns it at a list
export const buildHandler = async (): Promise<any> => {
  try {
    const configuration = await retreiveData('build');
    const buildInfoArray = Object.values(configuration);
    return buildInfoArray
  } catch (error) {
      console.error('Error fetching configuration data:', error);
      return ['Undefined']
    }
};

//Extracting the data of the element 'copyToTarget' from the JSON and returns it at a list
export const copyHandler = async (): Promise<any> => {
    try {
      const configuration = await retreiveData('copyToTarget');
      const copyInfoArray = Object.values(configuration);
      return copyInfoArray
    } catch (error) {
        console.error('Error fetching configuration data:', error);
        return ['Undefined']
      }
};

//Extracting the data of the element 'vvd' from the JSON and returns it at a list
export const GenerateVVDHandler = async (): Promise<any> => {
    try {
      const configuration = await retreiveData('vdd');
      const versionData = configuration;
      return versionData
    } catch (error) {
        console.error('Error fetching configuration data:', error);
        return ['Undefined']
      }
};

//Extracting the data of the element 'branchSelection', adds to the list the new brach and updates the JSON
export const addNewBranch = async ( branchName: string) : Promise<number> => {
  try {
    let configuration = await retreiveData('branchSelection');
    let newArray = Object.values(configuration)[0]
    if (branchName.length < 1) {return 3} //No data was entred
    if (Array.isArray(newArray)) {
      if (newArray.includes(branchName)) { return 1 }; //Branch is already in list
      
      const updatedBranches = [...newArray, branchName];
      
      const response = await fetch(`${JSON_URL}${'branchSelection'}`, {
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
  
      return 0;  // Indicating success  
    }
    return 2;
  } catch (error) {
    console.error('Error fetching configuration data:', error);
    return 2
  }
};

//Updates the 'selectedBranch' in JSON to be the new branch to be the new data that was entred by the user
export const selectBranch = async ( branchName: string) : Promise<number> => {
  try {
    let configuration = await retreiveData('branchSelection');
    const newArray = Object.values(configuration)[0]
    if (branchName.length < 1) {return 2}
    const response = await fetch(`${JSON_URL}${'branchSelection'}`, {
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

    return 0;  // Indicating success  
  } catch (error) {
    console.error('Error fetching configuration data:', error);
    return 1
  }
};

//Updates the data in the 'build' element in JSON to be the new data that was entred by the user
export const updateBuildInfo = async (versionData: string, buildCommand: string, outputDir: string): Promise<number> => {
  try {
    if (versionData.length < 1 || buildCommand.length < 1 || outputDir.length < 1) {return 2}
    const response = await fetch(`${JSON_URL}${'build'}`, {
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

    return 0;  // Indicating success

  } catch (error) {
    return 1;  // Indicating failure
  }
};

//Updates the data in the 'copyToTarget' element in JSON to be the new data that was entred by the user
export const updateCopyInfo = async (currentTarget: string): Promise<number> => {
  try {
    if (currentTarget.length < 1) {return 2}
    const response = await fetch(`${JSON_URL}${'copyToTarget'}`, {
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

    return 0;  // Indicating success

  } catch (error) {
    console.error("Error updating build info:", error);
    return 1;  // Indicating failure
  }
};

//Updates the data in the 'vvd' element in JSON to be the new data that was entred by the user
export const updateVVDInfo = async (currentDate: string, recentFixes: string[]): Promise<number> => {
  try {

    const responseFromBranch = await retreiveData('branchSelection');
    const responseFromBuild = await retreiveData('build');
    const responseFromCopy = await retreiveData('copyToTarget');

    const response = await fetch(`${JSON_URL}${'vdd'}`, {
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

    return 1;  // Indicating success

  } catch (error) {
    console.error("Error updating build info:", error);
    return 0;  // Indicating failure
  }
};
