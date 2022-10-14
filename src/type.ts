export const ALL_PACKAGE_MANAGER = ['npm', 'yarn', 'pnpm'] as const;
export const ALL_FRAMEWORK = ['react', 'vue', 'angular'] as const;

type PackageManager = typeof ALL_PACKAGE_MANAGER[number];
type Framework = typeof ALL_FRAMEWORK[number];

export type WorkflowOption = {
  fileName: string;
  packageManager: PackageManager;
  framework: Framework;
  'timeout-minutes': string;
  matrix: string;
};
