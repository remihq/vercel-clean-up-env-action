export const PREVIEW_NOT_GIT_BRANCH_SCOPED_VARIABLE_ID = "XhHeMKBSPqa42soM";
export const NON_PREVIEW_ENV_VARIABLE_ID = "XhHeMKBSPqa42soN";
export const DATABASE_URL_VARIABLE_ID = "ThHeMKBSPqa42soN";
export const OTHER_ENV_VARIABLE_ID = "AhHeMKBSPqa42soN";

export const mockEnvVariablesResponse = [
    {
        type: "encrypted",
        value: "mysql://1234",
        target: ["preview"],
        configurationId: null,
        gitBranch: "brantchoate/somebranch",
        id: DATABASE_URL_VARIABLE_ID,
        key: "DATABASE_URL",
        createdAt: 1635986818672,
        updatedAt: 1635986818672,
        createdBy: "1234",
        updatedBy: null,
    },
    {
        type: "encrypted",
        value: "somevalue",
        target: ["preview"],
        configurationId: null,
        gitBranch: "brantchoate/somebranch",
        id: OTHER_ENV_VARIABLE_ID,
        key: "OTHER_ENV",
        createdAt: 1635986818672,
        updatedAt: 1635986818672,
        createdBy: "1234",
        updatedBy: null,
    },
    {
        type: "plain",
        value: "ENV_2_VALUE",
        target: ["preview"],
        configurationId: null,
        id: PREVIEW_NOT_GIT_BRANCH_SCOPED_VARIABLE_ID,
        key: "ENV_2",
        createdAt: 1622428636135,
        updatedAt: 1622428636135,
        createdBy: "1234",
        updatedBy: null,
    },
    {
        type: "encrypted",
        value: "ENV_3_VALUE",
        target: ["production"],
        configurationId: null,
        id: NON_PREVIEW_ENV_VARIABLE_ID,
        key: "ENV_3",
        createdAt: 1622428636135,
        updatedAt: 1622428636135,
        createdBy: "1234",
        updatedBy: null,
    },
];
