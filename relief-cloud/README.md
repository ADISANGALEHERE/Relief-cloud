# ReliefCloud - Decentralized Disaster Relief Platform

ReliefCloud is a decentralized platform that connects NGOs, Media, and Volunteers for efficient disaster response and relief operations. The platform leverages blockchain technology to ensure transparency, accountability, and efficient coordination during disaster relief efforts.

## Features

- **Role-based Access Control**
  - Admin: Platform management and NGO approvals
  - NGOs: Relief operation management and resource coordination
  - Media: Disaster alert creation and updates
  - Volunteers: Donation and resource request management

- **Smart Contract Integration**
  - Secure and transparent transaction recording
  - Automated role management
  - Decentralized alert system
  - Resource tracking and management

- **User Interface**
  - Modern and responsive design
  - Real-time updates
  - Interactive dashboards
  - Mobile-friendly layout

## Prerequisites

- Node.js (v14 or higher)
- MetaMask or compatible Web3 wallet
- Modern web browser

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/relief-cloud.git
   cd relief-cloud
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the application:
   - Update the contract ABI in `js/app.js`
   - Add your contract address in `js/app.js`
   - Configure your RPC URL if needed

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:8000`

## Smart Contract Deployment

1. Compile the smart contract:
   ```bash
   npx hardhat compile
   ```

2. Deploy the contract:
   ```bash
   npx hardhat run scripts/deploy.js --network <your-network>
   ```

3. Update the contract address in `js/app.js`

## Usage

1. **Admin**
   - Approve/reject NGO registrations
   - Monitor system statistics
   - Manage platform settings

2. **NGOs**
   - Register and manage relief operations
   - Track donations and resources
   - Coordinate with volunteers

3. **Media**
   - Create verified disaster alerts
   - Provide real-time updates
   - Monitor alert status

4. **Volunteers**
   - Make donations
   - Request resources
   - Track relief efforts

## Security

- All transactions are secured through blockchain technology
- Role-based access control ensures proper authorization
- Smart contract functions are protected with appropriate modifiers
- Input validation and error handling throughout the application

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Ethereum Foundation
- Web3.js
- Tailwind CSS
- Font Awesome
- All contributors and supporters

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Roadmap

- [ ] Integration with IPFS for document storage
- [ ] Mobile application development
- [ ] Advanced analytics dashboard
- [ ] Multi-chain support
- [ ] Automated resource allocation
- [ ] Integration with external disaster management systems 