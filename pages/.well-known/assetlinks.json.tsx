import React from 'react';

export default function AssetLinks() {
  return <></>;
}

export const getServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(
    JSON.stringify([
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: 'com.uppermobile',
          sha256_cert_fingerprints: [
            'FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C',
          ],
        },
      },
    ]),
  );
  res.end();
  return {
    props: {},
  };
};
