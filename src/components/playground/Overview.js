import styles from './playground.module.css';

const Overview = () => {
  return (
    <div className={styles.overview}>
      <h5>Postman</h5>
      <p>
      Postman is a collaboration platform for API development. It simplifies each step of building an API and streamlines collaboration so that you can create better APIs—faster. Postman provides a user-friendly interface for testing, developing, and documenting APIs. Key features include:
    </p>

      <p>Features include:</p>
      <ul>
        <li>API Request Building: Create and send HTTP requests.</li>
        <li>Environment Management: Manage multiple environments with variables.</li>
        <li>Automated Testing: Write and execute tests for API responses.</li>
        <li>Collaboration Tools: Share collections and environments with team members.</li>
        <li>API Documentation: Automatically generate and publish documentation.</li>
        <li>Mock Servers: Simulate API endpoints.</li>
        <li>Monitoring and Alerts: Monitor API performance and uptime.</li>
        <li>API Collections: Organize requests into collections.</li>
        <li>Pre-request and Test Scripts: Automate workflows and validate responses.</li>

      </ul>

    </div>
  );
};

export default Overview;
