import React from 'react';

export default function AppleAppSiteAssociation() {
  return <></>;
}

export const getServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(
    JSON.stringify({
      applinks: {
        apps: [],
        details: [
          {
            appID: '<TeamID>.<BundileID>',
            paths: ['/app/*'],
          },
        ],
      },
    }),
  );
  res.end();
  return {
    props: {},
  };
};
