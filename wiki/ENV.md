# Environment

- In software development, the term "environment" or "tier" is used to refer a computer system or set of systems in which a computer program or software component is deployed and executed.

| Environment / Tier name | Description|
|-|-|
| **local** | Developer's desktop/workstation |
| **development** / trunk | Development server acting as a sandbox where unit testing may be performed by the developer |
| **integration** | CI build target, or for developer testing of side effects |
| **testing** / test / qc / internal acceptance | The environment when interface testing is performed. A quality control team ensures that the new code will not have any impact on the existing functionality and test major functionalities of system after deploying the new code in the test environment. |
| **staging** / stage / model / pre-production / external-client acceptance / demo | Mirror of production environment |
| **production** / live | Server end-user/clients |
