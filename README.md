#  Cloud-Native Full Stack Portfolio on Azure AKS

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=flat&logo=kubernetes&logoColor=white)
![Helm](https://img.shields.io/badge/HELM-0F1689?style=flat&logo=helm&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=flat&logo=microsoftazure&logoColor=white)

這是一個基於 **微服務架構 (Microservices)** 的全端作品集網站，部署於 **Azure Kubernetes Service (AKS)**。
專案展示了從開發、容器化、到自動化部署的完整 DevOps 實踐，並整合了 **Helm Chart** 管理、**HTTPS 自動憑證**以及 **Prometheus/Grafana 監控**。

---

## 🏗️ 系統架構 (Architecture)

本專案採用現代化的雲端原生架構，將前端、後端與資料庫分離，並透過 Ingress Controller 進行統一流量管理。

```text
[User / Internet]
       │
       │ (HTTPS / 443)
       ▼
[Ingress Controller (Nginx)]
       │
       ├── (Path: /) ──▶ [Frontend Pod (Nginx)]
       │
       └── (Path: /api) ──▶ [Backend Pod (Python)]
                                   │
                                   ▼
                            [Redis Database]

(Monitoring System)

[Prometheus] ──▶ Pulls Metrics from Frontend & Backend
[Grafana] ──▶ Visualizes Metrics
```

---

## 🛠️ 技術堆疊 (Tech Stack)

| 分類 (Category) | 技術 (Technology) | 用途 (Usage) |
| :--- | :--- | :--- |
| **Cloud & Infrastructure** | ![Azure](https://img.shields.io/badge/Azure-0072C6?style=flat-square&logo=microsoftazure&logoColor=white) ![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black) | 託管 Kubernetes 叢集 (AKS) 與基礎環境 |
| **Orchestration** | ![Kubernetes](https://img.shields.io/badge/Kubernetes-326ce5?style=flat-square&logo=kubernetes&logoColor=white) ![Helm](https://img.shields.io/badge/Helm-0F1689?style=flat-square&logo=helm&logoColor=white) | 容器編排、自動化部署與 Chart 套件管理 |
| **CI/CD & DevOps** | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | 自動化建置 Image、推送至 Docker Hub 並觸發 Helm 更新 |
| **Backend** | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) | 處理 API 邏輯與資料庫連線 |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white) | 靜態網頁展示與 Web Server 容器化 |
| **Database** | ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) | 訪客計數器資料存儲 (In-memory Data Structure Store) |
| **Traffic Control** | ![Nginx Ingress](https://img.shields.io/badge/Ingress-009639?style=flat-square&logo=nginx&logoColor=white) ![Let's Encrypt](https://img.shields.io/badge/Lets%20Encrypt-003a70?style=flat-square&logo=letsencrypt&logoColor=white) | 負載平衡、路由管理與自動化 HTTPS 憑證 (Cert-Manager) |
| **Observability** | ![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white) ![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat-square&logo=grafana&logoColor=white) | 系統監控、指標收集與儀表板視覺化 |

---

## 📂 專案結構 (Project Structure)

本專案已完成現代化遷移，從傳統的 YAML 檔案升級為 **Helm Chart** 統一管理，實現了配置與程式碼的分離。

```text
.
├── .github/workflows/       # 🤖 CI/CD 自動化腳本
│   └── deploy.yaml          # GitHub Actions 定義檔 (Build Image -> Push -> Helm Upgrade)
│
├── portfolio-chart/         # ⚓ [核心] Helm Chart 部署包
│   ├── templates/           # Kubernetes 資源模板 (Deployment, Service, Ingress, Issuer)
│   ├── Chart.yaml           # Chart 版本與元數據
│   └── values.yaml          # ⚙️ [控制台] 全域變數設定 (Replica 數量, Image 版本, Domain 設定)
│
├── 20260127 Portfolio/      # 🎨 [前端] 網頁原始碼
│   ├── Dockerfile           # 前端容器建置檔
│   ├── index.html           # 主頁面
│   └── style.css            # 樣式表
│
├── microservice/            # 🧠 [後端] 微服務架構
│   ├── python-app/          # Python API 服務
│   │   ├── app.py           # 應用程式邏輯
│   │   └── Dockerfile       # 後端容器建置檔
│   └── requirements.txt     # Python 依賴套件
│
└── README.md                # 📄 專案說明文件
```

---

## 🔄 CI/CD 自動化流程 (CI/CD Pipeline)

本專案採用 **GitHub Actions** 實現完整的 GitOps 自動化流程。從程式碼提交到服務上線，完全無需人工介入，並確保版本的一致性與可追溯性。

```text
[Developer]
    │
    ├── (Git Push) ──▶ [GitHub Repo]
                          │
                          ▼
                  [GitHub Actions Runner]
                          │
                          ├── 1. 🏗️ Build Docker Image
                          │       (Tag: v2.1-${{ run_number }})
                          │
                          ├── 2. 📤 Push to Docker Hub
                          │
                          └── 3. 🚀 Helm Upgrade ──(Trigger)──▶ [Azure AKS Cluster]
                                                                      │
                                                                      ▼
                                                             [Kubernetes Rolling Update]
                                                             Old Pods 🔴 ──▶ Terminating
```

---


## 📊 監控與觀測 (Monitoring & Observability)

本專案整合了雲端原生監控標準 **kube-prometheus-stack**，實現了對叢集、節點與應用程式的全方位可觀測性。

```text
[K8s Cluster]
     │
     ├── [Target: Nodes] ──────┐
     │                         │ (Scrape Metrics)
     ├── [Target: Pods] ───────┼─────────▶ [Prometheus Server]
     │                         │                 │ (Query)
     └── [Target: Ingress] ────┘                 ▼
                                           [Grafana Dashboard]
                                                 │
                                           (Exposed via Ingress)
                                                 ▼
                                           [Admin / Developer]
                                                             New Pods 🟢 ──▶ Running
```
---
## 🚀 如何部署 (How to Deploy)

本專案已完全容器化並支援 Helm Chart 部署。若您希望在本地或是自己的 Kubernetes 叢集上運行此專案，請參照以下步驟：

### 1. 前置需求 (Prerequisites)

在開始之前，請確保您的環境已安裝以下工具：
* **Kubernetes Cluster**: (AKS, GKE, EKS 或 Minikube)
* **Kubectl CLI**: 用於操作叢集
* **Helm 3**: 用於安裝 Chart
* **Nginx Ingress Controller**: (必要) 用於流量轉發
* **Cert-Manager**: (選用) 若需要自動簽署 HTTPS 憑證

### 2. 安裝步驟 (Installation Steps)

**步驟 1：複製專案**
```bash
git clone [https://github.com/louisvong1/Container-Practice.git](https://github.com/louisvong1/Container-Practice.git)
cd Container-Practice
```
**步驟 2：設定網域 (Configuration) 打開 portfolio-chart/values.yaml，根據您的 Ingress Controller IP 修改基礎網域設定**
```YAML
# portfolio-chart/values.yaml
ingress:
  baseDomain: "YOUR_IP_ADDRESS.nip.io"  # <--- 請替換成您的 Cluster IP
```
**步驟 3：執行安裝 (Install Chart)**
```Bash
# 建立一個新的 Release (例如命名為 my-portfolio)
helm install my-portfolio ./portfolio-chart
```
**步驟 4：驗證部署 (Verification)**
```Bash
# 檢查 Pod 是否全部 Running
kubectl get pods

# 取得網站連線位址
kubectl get ingress
```

### 3. 更新與維護 (Updates) ###
若您修改了 values.yaml 或更換了 Docker Image 版本，請使用升級指令（無需刪除重建）：
```Bash
helm upgrade my-portfolio ./portfolio-chart
```

### 4. 移除部署 (Uninstall) ###
若需清理環境，執行以下指令即可完整移除所有相關資源：
```Bash
helm uninstall my-portfolio
```

---

## 👨‍💻 作者 (Author)

**Louis Vong**
* **GitHub**: [louisvong1](https://github.com/louisvong1)
* **Portfolio**: [https://louisvong1.github.io/louis-portfolio/](https://louisvong1.github.io/louis-portfolio/)

