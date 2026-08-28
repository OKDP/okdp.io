---
title: User Guide
description: A user guide for OKDP control plane.
---

## Projects

In OKDP, the underlying object defining the project is a kubernetes [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) with the label `okdp.io/project` which isolates the application services deployed within from the ones in the other projects. The name of the project is the name of the namespace. Therefore, you find in urls of platform services the project name followed by the service or the service component.

## Dashboard

The central display shows at the top the number of deployed instances and running instances as well as CPU and memory used for the project.

An instance in OKDP is a deployment belonging to a service containing one or several pods. The Trino instance for example contains at least a Trino coordinator and one worker.

Beneath, all deployed instances are listed with their service, their status as well as used CPU and memory.

You may click on one of the instances and details are shown about it:

![Instance-overview](../../assets/instance-overview.png)

The three tabs at the bottom: `Deploy Notebook`, `View instances`, and `Manage Secrets` are shortcuts to respectively JupyterHub deployment, Jupyterlab spawn and the Secret management section.

On the top left we have the choice between `Platform` and `Views`. Let's first look at `Platform`, which contains the service catalog and the `Project Panel`.

![Dashboard](../../assets/dashboard.png)

### Services

The OKDP service catalog is on the left toolbar when clicking on the tab `Platform`.
It contains the sections:

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
  - Spark

The Spark Application Service using the Spark operator is not present in the service catalog here, it is accessed in the `Views` dashboard.

### Project Panel

The Project Panel is below the service catalog and contains the sections: `Connections`, `Secrets` and `Settings`.

How to create or edit `Connections` is explained in the [Admin guide](../admin-guide/). However, you can view the details by clicking on the line of the connection.

![Connection](../../assets/connection.png)

In the `Settings` section, the project description and color can be modified as well as the deletion of the project can be performed. Moreover, you have the option to create `Custom views`. Their role is to display a tab for a service which is outside of the OKDP platform service scope.

![Project settings](../../assets/project-settings.png)

To create a custom view, click on the tab `New view`, then give a name to the view, optionally a description and choose a category between:

- `Lakehouse`
- `Data Engineering`
- `Notebooks`
- `SQL & BI`
- `Machine Learning`

Then pick an icon. If the box `Show in the views lateral menu` is not ticked, the view will not be visible in the main menu under the `Views` tab.

Finally click on `Create`.

![View creation](../../assets/view-creation.png)

### Views

Views give access to the user interfaces of deployed services, as well as to non-OKDP services added through the `Custom views` option under the categories mentioned above.

![View dashboard](../../assets/view-dashboard.png)

If we click on the SeaweedFS icon which was created previously, a window tab opens with the SeaweedFS filer browser.

![SeaweedFS filer browser](../../assets/seaweedfs-browser.png)

An exception is the `Spark Application` view which does not lead to the user interface of Spark, but instead to an interface to write an application for the Spark operator.

## Using a service

How to instantiate and modify a service is explained in the [Admin guide](../admin-guide/) to the exception of Airflow as the usage coincides with its deployment. Otherwise, we describe here, how to use an already deployed service.

Each time you see the small window sign, it brings you to the user interface of the service.

![service window opener](../../assets/service-window-opener.png)

### JupyterHub

If JupyterHub is already deployed, a lab must be spawned in order to access a Notebook.

Click on the `Open` button mentioned before, either in the view or in the service window shown at the beginning, and you will have a choice among four images.

![Jupyterlab images](../../assets/jupyterlab-images.png)

Once you chose one and click on `Start`, a pod with the Jupyterlab is being spawned.

![JupyterLab spawning](../../assets/jupyterlab-spawning.png)

Finally, you have access to your notebook:

![Jupyter notebook](../../assets/jupyter-notebook.png)

### Airflow

Airflow is a particular case since running a Job is equivalent to deploying a service.

Here is an example deployment using the jobs in the [okdp-examples](https://github.com/okdp/okdp-examples.git) repository.

Go to the section `Data Engineering` in the `Platform` catalog, click on Airflow. You then either click on `New instance` in the middle or on `Deploy` on the top right. They both lead to the same page.

![Airflow deployment 1](../../assets/airflow-deployment-1.png)

Choose an instance name in lowercase and an Airflow version and press on `Next`.

![Airflow deployment 2](../../assets/airflow-deployment-2.png)

Choose a connection to a database. If it does not exist, it can be created by clicking `+ New connection`, however, the procedure to create it is explained in the [Admin guide](../admin-guide/). Then configure the DAG with the Git syncing parameters.

![Airflow deployment 3](../../assets/airflow-deployment-3.png)

If you want to change the sizing, you may enter different values for the scheduler and webserver memory. Then enter the Kubernetes secret name containing the credentials to connect to the database. Finally you may put some keys and values for the OIDC role mapping for the Airflow job and click on `Next`.

![Airflow deployment 4](../../assets/airflow-deployment-4.png)

You then have a recapitulation of the deployment. Click on `Deploy instance` to start the deployment.

![Airflow deployment 5](../../assets/airflow-deployment-5.png)

You are now redirected to the instance page of the Airflow service and to get details you may click on the line containing the information.

![Airflow deployment 6](../../assets/airflow-deployment-6.png)

Once it is ready, you access the UI by clicking on the Window Icon.

![Airflow UI](../../assets/airflow-ui.png)

### Spark application

OKDP has the Spark Operator integrated although it is not shown in the service catalog under the tab `Platform`. However, it is accessed under the tab `Views` in the section `Data Engineering`. It is also a built-in View and can be seen in the central part of the dashboard.

After clicking on one of the mentioned icons, you may launch a spark application by filling the following fields if you are in the section `Guided` and by clicking on submit.

![Spark application 1](../../assets/spark-application-1.png)
After clicking on one of the mentioned icons, and if you are in the `Guided` section, you may launch a Spark application by filling in the fields:

![Spark application 1](../../assets/spark-application-1.png)

Scroll down to set the driver and executor resources and any additional Spark configuration, then click on `Submit`:

![Spark application 2](../../assets/spark-application-2.png)

Or, you may do the same by pasting the Spark application in yaml format under the `YAML` section and by clicking on `Submit YAML`.

![Spark application yaml](../../assets/spark-application-yaml.png)

You may follow the state of the application.

![Spark application 3](../../assets/spark-application-3.png)

And look at the details and logs by clicking on the icon with the eye next to `Detail`.

![Spark application 4](../../assets/spark-application-4.png)
