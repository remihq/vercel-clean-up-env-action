import { mocked } from "ts-jest/dist/utils/testing";
import VercelEnvVariabler from "./VercelEnvVariabler";
import { listEnvVariables, deleteEnvVariable } from "./vercel";
import { AxiosResponse } from "axios";
import { mockEnvVariablesResponse } from "./envVariableFixtures";

jest.mock("./vercel.ts", () => {
    const actualModule = jest.requireActual("./vercel.ts");
    return {
        ...jest.genMockFromModule<typeof actualModule>("./vercel.ts"),
        VercelEnvVariableTarget: actualModule.VercelEnvVariableTarget,
    };
});

describe("VercelEnvVariabler", () => {
    beforeAll(() => {
        mocked(listEnvVariables).mockResolvedValue({
            data: { envs: mockEnvVariablesResponse },
        } as AxiosResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const testToken = "1234";
    const testProjectName = "test-vercel-project";
    const testTeamId = "team_1234";

    it("Should delete all env vars in vercel related to gitBranch", async () => {
        mocked(listEnvVariables).mockResolvedValue({
            data: { envs: mockEnvVariablesResponse },
        } as AxiosResponse);
        const testGitBranch = "brantchoate/somebranch";

        const variabler = new VercelEnvVariabler(
            testToken,
            testProjectName,
            testTeamId,
            testGitBranch
        );

        await variabler.cleanUpExistingEnvVariables();

        expect(mocked(deleteEnvVariable)).toHaveBeenCalledTimes(2);
    });
});
