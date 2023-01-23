## Install kubernetes with kubeadm

### 1. Prepare Images

```bash
wget https://github.com/kubernetes-sigs/cri-tools/releases/download/v1.23.0/crictl-v1.23.0-linux-amd64.tar.gz
wget https://dl.k8s.io/v1.23.5/kubernetes-server-linux-amd64.tar.gz

docker pull registry.aliyuncs.com/google_containers/kube-apiserver:v1.23.5
docker pull registry.aliyuncs.com/google_containers/kube-controller-manager:v1.23.5
docker pull registry.aliyuncs.com/google_containers/kube-scheduler:v1.23.5
docker pull registry.aliyuncs.com/google_containers/kube-proxy:v1.23.5
docker pull registry.aliyuncs.com/google_containers/pause:3.6
docker pull registry.aliyuncs.com/google_containers/etcd:3.5.1-0
docker pull registry.aliyuncs.com/google_containers/coredns:v1.8.6
docker pull docker.io/flannel/flannel:v0.20.2
docker pull docker.io/flannel/flannel-cni-plugin:v1.1.2
```

### 2. Setup kubeadm


