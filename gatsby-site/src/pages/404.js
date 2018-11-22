import React from 'react';
import Layout from '../components/Layout';
import SubHeader from '../components/SubHeader';

const title = "Error";
const subtitle = "This page doesn't exist";

const NotFoundPage = () => (
  <Layout>
    <SubHeader title={title} subtitle={subtitle} />
  </Layout>
);

export default NotFoundPage;
