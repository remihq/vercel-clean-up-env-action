import { getInput, info, setFailed } from "@actions/core";
import VercelEnvVariabler from "./VercelEnvVariabler";

async function run(): Promise<void> {
    try {
        const token: string = getInput("token", { required: true });
        const projectName: string = getInput("projectName", { required: true });
        const gitBranch: string = getInput("gitBranch", {
            required: true,
        });

        const teamId: string = getInput("teamId");

        const envVariabler = new VercelEnvVariabler(
            token,
            projectName,
            teamId,
            gitBranch
        );

        await envVariabler.cleanUpExistingEnvVariables();
        info(
            `Vercel env variables cleaned up successfully for branch: ${gitBranch}`
        );
    } catch (error) {
        // @ts-ignore
        setFailed(error.message);
    }
}

run();
