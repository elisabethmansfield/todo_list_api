import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import ContactForm from '../containers/ContactForm';

const webhook = "https://hooks.zapier.com/hooks/catch/4092388/c34q49/";
const ContactPage = () => (
  <Layout>
    <ContactForm webhook={webhook}/>
  </Layout>
);

export default ContactPage;
