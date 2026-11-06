# ShaderCam Desktop downloads

[Download the Windows installer from Releases](https://github.com/thomas-mardis/shadercam-desktop-releases/releases).

This is the public download and update repository for a personal project owned by **thomas-mardis**. The application source is maintained in a separate private repository.

Run the **Setup.exe** for a per-user installation. Studio's Settings provides virtual-camera installation/repair, which requests Windows administrator approval. Ordinary app updates do not require elevation. Choose **shadercam** in your meeting app.

Use the app's Updates panel to check, download, and restart into a new version. The included launcher replaces the app automatically and preserves your settings and authored shaders. Close meeting consumers and stop capture before restarting. No GitHub login, Git client, Python, or application .NET runtime is required.

Preview installers are not Authenticode signed, so Windows may display an unknown-publisher warning. Updates use Ed25519-signed metadata and verified package sizes/hashes. Speech transcription and its English model are excluded. CUDA and diffusion model weights are not bundled.

Release notes describe validation limits. Clean-machine camera setup, recipient-side calls and full redistribution review remain open gates; these are previews, not a claim of production certification.

The workflow in this repository renews signed feed metadata twice weekly. It uses a protected signing secret, never published in release assets. Package hashes in the signed feed authenticate downloads; SHA256SUMS.txt records original publication contents and is not used to authenticate renewable metadata.
