![Project Preview](/preview.png)

# Resource Manager

A desktop application built with Electron.js to monitor and manage system resources. Resource Manager provides real-time insights into disk usage, CPU, memory, and other system metrics, with a user-friendly interface powered by React and Recharts for data visualization.

## Technologies

- **Electron.js**: For building the cross-platform desktop application.
- **React**: For the user interface.
- **Recharts**: For data visualization and charts.
- **Vite**: For fast frontend build and development.
- **Node.js Libraries**:
  - `node-disk-info` and `node-os-utils` for system resource monitoring.

## How to Run

### 1. Clone the Repository

Clone the project to your local machine and navigate to the project directory:

```bash
git clone https://github.com/ezekuiel100/resource-manager.git
cd resource-manager
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Run in Development Mode

Start the React frontend:

```bash
npm run dev:react
```

Start the Electron app:

```bash
npm start
```

### 4. Build for Production

To create a production-ready build, run:

```bash
npm run build && npm run build:electron
```
