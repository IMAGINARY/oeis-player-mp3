#!/bin/bash
##########################################################################
# Installation script
# -------------------
#
# This script downloads appropiate versions of dependencies and combines
# them with MiMa configuration files and custom apps.
##########################################################################
set -e

LAUNCHERREPO=https://github.com/IMAGINARY/applauncher2
LAUNCHERVERSION=v1.9.1

# Change to directory where the install script resides
cd "$(dirname "$0")"

echo "Installing to `pwd`/dist"

# Capture errors if download fails
set -o pipefail

# Download the launcher to the html directory
LAUNCHERPKG=${LAUNCHERREPO}/archive/${LAUNCHERVERSION}.tar.gz
mkdir -p dist
echo ". Downloading applauncher2 from ${LAUNCHERPKG}"
curl -L ${LAUNCHERPKG} | tar xz -C dist --strip 1

if [ $? -ne 0 ]; then { echo "Failed downloading applauncher2." ; exit 1; }; fi

# Copy the credits applications
echo ". Copying the AppLauncher applications"
mkdir -p dist/apps/oeis
cp -fR applauncher/apps/. dist/apps/

# Copy the configuration files
echo ". Copying the configuration files"
cp -fR applauncher/cfg/. dist/cfg/

# Copy the themes files
echo ". Copying the themes"
cp -fR applauncher/themes/. dist/themes/

echo "Installation complete!"
