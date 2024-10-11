import { MainLayout } from "layouts/components/Layout";

export const withMainLayout =
  (Page: React.FC): React.FC =>
  () => {
    return (
      <MainLayout navbar>
        <Page />
      </MainLayout>
    );
  };
