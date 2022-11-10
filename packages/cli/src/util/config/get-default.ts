import { AuthConfig, GlobalConfig } from '../../types';

export const defaultGlobalConfig: GlobalConfig = {
  '// Note':
    'This is your Youappz config file. For more information see the global configuration documentation.',
  '// Docs':
    'https://youappz.com/docs/project-configuration#global-configuration/config-json',
  collectMetrics: true,
};

export const defaultAuthConfig: AuthConfig = {
  '// Note': 'This is your Youappz credentials file. DO NOT SHARE!',
  '// Docs':
    'https://youappz.com/docs/project-configuration#global-configuration/auth-json',
};
