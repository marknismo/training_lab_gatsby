import React from "react";
import Layout from "../components/layout";
import UpdateDNS from "../components/updateDNS";

const Index = () => (
  <Layout>
    <h1>Why is zone transfer not working on the secondary DNS?</h1>
    <p>
      A customer is reporting an update in the DNS TXT record is not updating
      the DNS records on the secondary DNS
    </p>
    <UpdateDNS />
  </Layout>
);

export default Index;
