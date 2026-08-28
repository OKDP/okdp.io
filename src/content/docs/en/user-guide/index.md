---
title: User Guide
description: A user guide for OKDP control plane.
---

## Projects

In OKDP, the underlying object defining the project is a Kubernetes [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) with the label `okdp.io/project` which isolates the application services deployed within from the ones in the other projects. The name of the project is the name of the namespace. Therefore, you find in the URLs of platform services the project name followed by the service or the service component.

## Dashboard

The central display shows at the top the number of deployed instances and running instances as well as the CPU and memory used for the project.

An instance in OKDP is a deployment belonging to a service containing one or several pods. The Trino instance, for example, contains at least a Trino coordinator and one worker.

Beneath, all deployed instances are listed with their service, and their status as well as used CPU and memory.

You may click on one of the instances, and details are shown about it:

![Instance overview](../../assets/instance-overview.png)

The three tabs at the bottom: `Deploy Notebook`, `View instances`, and `Manage Secrets` are shortcuts to, respectively, JupyterHub deployment, JupyterLab spawn, and the secret management section.

On the top left we have the choice between `Platform` and `Views`. Let's first look at `Platform`, which contains the service catalog and the `Project Panel`.

![Dashboard](../../assets/dashboard.png)

### Services

The OKDP service catalog is on the left toolbar when clicking on the tab `Platform`.
It initially contains the following sections:

- Data Catalog
  - hive-metastore
  - Polaris
- Interactive Query
  - Trino
- SQL & BI
  - Superset
- Notebooks
  - JupyterHub
- Data Engineering
  - Airflow
- Spark
  - Spark History Server

The Spark Application Service using the Spark operator is not present in the service catalog here; it is accessed in the `Views` dashboard.

Note: The administrator can modify the catalog by adding or removing a service; therefore, do not be surprised if other services are listed or, on the contrary, do not appear.

### Project Panel

The Project Panel is below the service catalog and contains the sections: `Connections`, `Secrets` and `Settings`.

Creating or editing `Connections` is a task for an administrator . You can, however, view the details by clicking on the line of the connection.

![Connection](../../assets/connection.png)

In the `Settings` section, the project description and color can be modified, as well as the deletion of the project can be performed. Moreover, you have the option to create `Custom views`. Their role is to display a tab for a service that is outside the OKDP platform service scope.

![Project settings](../../assets/project-settings.png)

To create a custom view, click on the tab `New view`, then give a name to the view, optionally a description, and choose a category from the following:

- `Lakehouse`
- `Data Engineering`
- `Notebooks`
- `SQL & BI`
- `Machine Learning`

Then pick an icon. If the box `Show in the views lateral menu` is not ticked, the view will not be visible in the main menu under the `Views` tab.

Finally, click on `Create`.

![View creation](../../assets/view-creation.png)

### Views

Views give access to the user interfaces of deployed services, as well as to non-OKDP services added through the `Custom views` option under the categories mentioned above.

![View dashboard](../../assets/view-dashboard.png)

If we click on the SeaweedFS icon, which was created previously, a window tab opens with the SeaweedFS filer browser.

![SeaweedFS filer browser](../../assets/seaweedfs-browser.png)

An exception is the `Spark Application` view, which does not lead to the user interface of Spark but instead to an interface to write an application for the Spark operator.

## Using a service

Instantiating and modifying a service are tasks for administrators, except for Airflow, as the usage coincides with its deployment. Otherwise, we describe here how to use an already deployed service. However, before accessing one, make sure that its status is marked as `Ready` which means that all its pods, which you can see by clicking on the little eye icon, are in status `Running`. If it is not the case, please contact your administrator to mend the situation.

Each time you see the small window icon, it brings you to the user interface of the service.

![service window opener](../../assets/service-window-opener.png)

### JupyterHub

If JupyterHub is already deployed, a lab must be spawned in order to access a Notebook.

Click on the `Open` button mentioned before, either in the view or in the service window shown at the beginning, and you will have the choice among four images.

![JupyterLab images](../../assets/jupyterlab-images.png)

Select one of the notebooks, and if you chose the `PySpark` notebook, you may also pick the PySpark/Python kernel version and then click on `Start`. Once done, a pod with the corresponding JupyterLab image is being spawned.

![JupyterLab spawning](../../assets/jupyterlab-spawning.png)

Finally, you have access to your notebook and may use it from now on.

![Jupyter notebook](../../assets/jupyter-notebook.png)

The pod containing your spawned JupyterLab will remain running until you press on `Stop My Server` in the notebook menu under `File` -> `Hub Control Panel`. You also have to stop it if you want to spawn a new JupyterLab with another image.

### Airflow

Airflow is a particular case since running a job is equivalent to deploying a service.

Here is an example deployment using the jobs in the [okdp-examples](https://github.com/okdp/okdp-examples.git) repository.

Go to the section `Data Engineering` in the `Platform` catalog, click on Airflow. You then either click on `New instance` in the middle or on `Deploy` on the top right. They both lead to the same page.

![Airflow deployment 1](../../assets/airflow-deployment-1.png)

Choose an instance name in lowercase and an Airflow version and press on `Next`.

![Airflow deployment 2](../../assets/airflow-deployment-2.png)

Choose a connection to a database. If it does not exist, it can be created by clicking `+ New connection`, however, the creation procedure is a task for your administrator. Then configure the DAG with the Git syncing parameters.

![Airflow deployment 3](../../assets/airflow-deployment-3.png)

If you want to change the sizing, you may enter different values for the scheduler and web server memory. Then enter the Kubernetes secret name containing the credentials to connect to the database. As a simple user, you will not know which secret name to enter here. Please contact your administrator to give you this information. Finally, you may put some keys and values for the OIDC role mapping for the Airflow job, which should also be given to you by your administrator, and click on `Next`.

![Airflow deployment 4](../../assets/airflow-deployment-4.png)

You then have a recapitulation of the deployment. Click on `Deploy instance` to start the deployment.

![Airflow deployment 5](../../assets/airflow-deployment-5.png)

You are now redirected to the instance page of the Airflow service, and to get details, you may click on the line containing the information.

![Airflow deployment 6](../../assets/airflow-deployment-6.png)

Check that the status is in mode `Ready`. If it isn't, you may look at the logs by clicking on the eye icon and then on the `Logs` button of the pods that are not in status `Running`. If it is not the case, you can access the user interface by clicking on the window icon.

![Airflow UI](../../assets/airflow-ui.png)

### Spark application

OKDP has the Spark Operator integrated, although it is not shown in the service catalog under the tab `Platform`. However, it is accessed under the tab `Views` in the section `Data Engineering`. It is also a built-in view and can be seen in the central part of the dashboard.

After clicking on one of the mentioned icons, you may launch a Spark application by filling in the following fields if you are in the section `Guided` and by clicking on submit.

![Spark application 1](../../assets/spark-application-1.png)

Scroll down to set the driver and executor resources and any additional Spark configuration, then click on `Submit`:

![Spark application 2](../../assets/spark-application-2.png)

Or, you may do the same by pasting the Spark application in YAML format as shown below under the `YAML` section and by clicking on `Submit YAML`.

```yaml
apiVersion: sparkoperator.k8s.io/v1beta2
kind: SparkApplication
metadata:
  labels:
    okdp.io/project: demo
  name: spark-pi
  namespace: demo
spec:
  driver:
    cores: 1
    memory: 1g
  executor:
    cores: 1
    instances: 1
    memory: 1g
  image: quay.io/okdp/spark:spark-3.4.1-scala-2.12-java-17-2026-08-25-2.1.0
  mainApplicationFile: local:///opt/spark/examples/jars/spark-examples_2.12-3.4.1.jar
  mainClass: org.apache.spark.examples.SparkPi
  mode: cluster
  restartPolicy:
    type: Never
  timeToLiveSeconds: 3600
  type: Java
```

You may follow the state of the application in the display and verify that it is marked as `Succeeded` in blue after being in status `Running` in green.
Superset needs two database-server connections. One to the database containing the data and the other one to the metadata. Without an OIDC mapping, every user lands in the Public category, and Superset refuses all.

Here is an example of a Superset deployment in YAML format:

![Spark application 3](../../assets/spark-application-3.png)

If it stays in status `Running` or any other status, look at the details and logs by clicking on the icon with the eye next to `Detail`.

![Spark application 4](../../assets/spark-application-4.png)

### Other services through their user interface

Operating Polaris or Superset is done through their own user interface. You access them by clicking on the small window icon mentioned previously.
