import axios, { AxiosInstance } from "axios";
import {
    VercelEnvVariable,
    VercelEnvVariableTarget,
    listEnvVariables,
    deleteEnvVariable,
} from "./vercel";
import { info } from "@actions/core";

export const VALID_TYPES = ["encrypted", "plain"];

export const VALID_TARGETS: VercelEnvVariableTarget[] = [
    VercelEnvVariableTarget.Production,
    VercelEnvVariableTarget.Preview,
    VercelEnvVariableTarget.Development,
];

export default class VercelEnvVariabler {
    private vercelClient: AxiosInstance;

    constructor(
        private token: string,
        private projectName: string,
        private teamId: string | undefined,
        private gitBranch: string
    ) {
        if (!this.token || !this.projectName || !this.gitBranch) {
            throw new Error("Missing required input(s).");
        }

        this.vercelClient = axios.create({
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
            baseURL: "https://api.vercel.com/v8",
            params: {
                teamId: this.teamId,
            },
        });
    }

    public async cleanUpExistingEnvVariables(): Promise<void> {
        const envResponse = await listEnvVariables(
            this.vercelClient,
            this.projectName
        );

        const env = envResponse?.data?.envs;
        if (env) {
            info(`Found ${env.length} existing total env variables`);

            const needsCleanUpEnv = this.filterOutUnQualifiedEnvVariables(
                env,
                this.gitBranch
            );

            for (const existingEnvVariable of needsCleanUpEnv) {
                try {
                    const deleteResponse = await deleteEnvVariable(
                        this.vercelClient,
                        this.projectName,
                        existingEnvVariable.id
                    );
                    if (deleteResponse?.data) {
                        info(
                            `${existingEnvVariable.key} for git branch: ${this.gitBranch} cleaned up successfully.`
                        );
                    } else {
                        info(`${JSON.stringify(deleteResponse)}`);
                    }
                } catch (err) {
                    // @ts-ignore
                    info(err.message);
                }
            }
        }
    }

    private filterOutUnQualifiedEnvVariables(
        variables: VercelEnvVariable[],
        gitBranch: string
    ): VercelEnvVariable[] {
        return variables
            .filter((item: VercelEnvVariable) =>
                item.target.includes("preview" as VercelEnvVariableTarget)
            )
            .filter(
                (item: VercelEnvVariable) =>
                    item.gitBranch && item.gitBranch === gitBranch
            );
    }
}
