import { MainLayout } from "layouts/components/Layout";

export const withHomeLayout =
  (Page: React.FC): React.FC =>
  () => {
    return (
      <MainLayout>
        <Page />
      </MainLayout>
    );
  };
