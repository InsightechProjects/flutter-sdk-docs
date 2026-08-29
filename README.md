# Insightech Flutter SDK — documentation

Source for the published documentation site:
**https://insightechprojects.github.io/flutter-sdk-docs/**

The SDK itself lives in
[v2-sdk-flutter](https://github.com/InsightechProjects/v2-sdk-flutter), which
carries this repo as a submodule at `docs/`.

Built with [Docusaurus](https://docusaurus.io/), deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

## Local development

```bash
npm install
npm start          # live-reloading dev server
npm run build      # production build, catches broken links
```

## Conventions

Page order and naming mirror the
[React Native SDK docs](https://github.com/InsightechProjects/react-native-sdk-docs)
so anyone moving between the two SDKs finds the same thing in the same place.
The two SDKs share most of their behaviour by design, so when you change a
page here, check whether the RN equivalent needs the same change.
