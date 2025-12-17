# Azure Deployment Guide

Deploying the AiBlog application to **Azure Container Apps** - a serverless container platform with a generous free tier.

## Prerequisites
- Azure account with free credits ($200 for 30 days)
- Docker Desktop installed

## Steps

### Step 1: Install Azure CLI

The Azure CLI lets you manage Azure resources from the command line.

```powershell
winget install Microsoft.AzureCLI
```

After installation, restart terminal and login:

```powershell
az login
```

### Step 2: Create a Resource Group

A Resource Group is a container that holds all related Azure resources together. Benefits:
- **Organization** - Keep all AiBlog resources in one place
- **Easy cleanup** - Delete the group = delete everything inside
- **Billing** - Track costs for this project separately

```powershell
az group create --name aiblog-rg --location eastus
```

### Step 3: (Next steps coming soon...)
