import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/// Mirrors the React Native SDK's page order so anyone moving between the two
/// SDKs finds the same thing in the same place.
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'installation',
    'quick-start',
    'automatic-tracking',
    'element-identification',
    'privacy-masking',
    'custom-events',
    'error-tracking',
    'form-tracking',
    'api-error-tracking',
    'configuration',
    'how-it-works',
    'troubleshooting',
    'api-reference',
  ],
};

export default sidebars;
