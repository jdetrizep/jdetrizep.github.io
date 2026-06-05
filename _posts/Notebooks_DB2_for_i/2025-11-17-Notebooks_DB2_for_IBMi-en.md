---
lang: en
layout: post
title: Notebooks in DB2 for i
date: 2025-11-27 08:00
modified: 2025-11-27 08:00
description: Notebooks in DB2 for i - A new way to work with SQL, CL, and documentation on IBM i
permalink: /Notebooks_DB2_for_IBMi/
tag:
  - IBM i
  - DB2
  - Notebooks
image: /Notebooks_DB2_for_i/PortadaNotebooks_DB2.png
---

# 📘 From Green Screens to Notebooks:  
## The Evolution of Development on IBM i with VS Code and the Db2 for i Extension

For many years, the daily routine of those of us who develop and administer systems on IBM i always began the same way: **a logon on a green screen, a menu with numbered options, F4 for help, F9 to repeat, F3 to exit**. 

We programmed in **SEU or RDi** editors, ran CL commands one by one, copied SQL queries into separate windows, and exporting results was a manual, almost artisanal process. It was work that required patience and attention to detail, but it also involved many intermediate steps and context switches, and the user experience left much to be desired, since there were no graphical interfaces or integrated tools.

That stage built discipline, precision, and a structured way of working, but it also meant that **many tasks were more complex than they needed to be**.

Today, that world is changing, and very fast. As IBM i developers and administrators, we are adopting new tools and methodologies that allow us to be more productive and efficient, and to improve the user experience in our daily work.

The modernization of IBM i is no longer only about RPG Full Free, REST APIs, modern SQL, or DevOps. Now, we also talk about **visual, collaborative development environments designed for productivity**, where documentation, code, and results coexist in the same space.

And in that evolutionary leap, **VS Code** and the **Db2 for i** extension are making a huge difference.

<figure>
<img src="./PortadaNotebooks_DB2_for_i.png" alt="Notebooks in the DB2 for i extension" />
<figcaption>Fig 1. Notebooks in the DB2 for i extension.</figcaption>
</figure>

# 🚀 The Notebook Revolution in VS Code

**Notebooks**, very common in environments like Python, Jupyter, Databricks, or Google Colab, combine three powerful elements:

- **Markdown** to explain and document, which allows you to create rich text with formatting, images, and links, in order to facilitate the understanding and tracking of the processes carried out.
- **Executable code** to perform data analysis processes, SQL queries, CL commands, or other types of code, directly from the notebook, without needing to switch tools or windows. With this, greater integration between documentation and code is achieved, which facilitates the reproduction and validation of results.  
- **Visual results** (tables, charts, logs, or interactive objects) to display the results of code executions in a clear and attractive way, facilitating the analysis and interpretation of the data. The results can include data tables, statistical charts, execution logs, or other interactive objects that enrich the user experience.

**VS Code** adopted this concept and created a standard so that any extension can implement its own type of notebook. This opened the door for the IBM i community to introduce a new format that transforms the way we work: the **i Notebooks**. With them, we can combine documentation, code, and results in a single file, which facilitates collaboration, learning, and productivity in our daily work with IBM i.

📄 Official documentation of the notebooks framework:
<p>
    <a href="https://code.visualstudio.com/blogs/2021/11/08/custom-notebooks" target="_blank">Custom Notebooks in VS Code</a>.
</p>
  


# 🟦 Notebooks in Db2 for i: a profound change in how we work

The **Db2 for i** extension (part of the *Code for IBM i* ecosystem) now allows you to create notebooks that combine:

- **Markdown** cells to document processes, allowing you to write notes, conclusions, and objectives alongside the code that supports them. This facilitates the understanding and tracking of the processes carried out.
- **SQL** cells to run queries directly on IBM i, which allows you to run queries in the same view, without needing to switch windows or tools. This improves the integration between documentation and code, facilitating the reproduction and validation of results.
- **CL** cells to run system commands. This allows you to run CL commands directly from the notebook, integrating system administration with documentation and data analysis.
- Results in table, JSON, or CSV format. This allows you to display the results of code executions in different formats, facilitating the analysis and interpretation of the data. It allows you to display results in tabular, JSON, or CSV environments, according to the user's needs.
- And the most revolutionary part: **charts generated directly from SQL!** This means that SQL queries can now turn into **mini dashboards** within VS Code itself, generating bar, line, pie, doughnut, radar, and polar area charts with a simple rule: having a “LABEL” column and numeric values.

This turns a simple file into a **living document**, where you:

- Document what you do, achieving greater integration between documentation and code.
- Explain why you do it, facilitating the understanding and tracking of the processes carried out.
- Execute the code, without needing to switch windows or tools.
- Visualize the result, displaying the results in different formats and attractive charts.
- Share the notebook with your team, facilitating collaboration and learning among team members.
- Include it in Git with its full history, allowing you to version notebooks like any other code, facilitating change control and team collaboration.

📘 Official Db2 for i documentation for notebooks and charting:
<p>
    <a href="https://codefori.github.io/docs/extensions/db2i/#charting-with-sql" target="_blank">Db2 for i - Charting with SQL</a>.
</p>


# ✨ Why is this approach so powerful?

Because it combines the best of three worlds, offering a unique and efficient development experience on IBM i:

### **1️⃣ Documentation that maintains itself**  
Markdown lets you write notes, conclusions, and objectives alongside the code that supports them. This facilitates the understanding and tracking of the processes carried out, eliminating the need to maintain separate documents that can become outdated. By having documentation integrated with the code, you ensure that it is always aligned with what is actually being executed, improving the quality and clarity of the work done.

### **2️⃣ SQL/CL code that is always tested**  
The queries run in the same view, without needing to switch windows or tools. This improves the integration between documentation and code, facilitating the reproduction and validation of results. By having the code and the results in a single place, the possibility of errors is reduced and the development and analysis process is sped up.

### **3️⃣ Integrated data visualization**  
With a simple rule —**having a “LABEL” column and numeric values**— Db2 for i generates charts:

- Bar  
- Line  
- Pie and Doughnut  
- Radar  
- PolarArea  

This means that your SQL queries can now turn into **mini dashboards** within VS Code itself. This allows you to analyze and present data in a visual and attractive way, facilitating the interpretation and decision-making based on the obtained results.

### **4️⃣ Real collaboration for IBM i teams**  
Notebooks can be saved in GitHub or Azure DevOps and versioned like any other code. This facilitates collaboration among team members, allowing them to share knowledge, review changes, and maintain a complete history of the modifications made. By integrating notebooks into DevOps workflows, the efficiency and quality of development on IBM i is improved.

### **5️⃣ Training and knowledge transfer**  
They are ideal for explaining business processes, showing queries to analysts, or giving internal workshops. Notebooks allow you to create interactive and dynamic training materials, where participants can see the documentation, execute the code, and analyze the results in a single place. This facilitates knowledge transfer and improves the understanding of the concepts and processes related to IBM i.


# 📊 Simple example of a Notebook with an SQL Chart

### 📄 Markdown  
```markdown
## Sales by Month
In this analysis we visualize the sales behavior by month using data from the SALES table.
```

### 📈 SQL  
```sql
SELECT 
    MONTHNAME(date) AS LABEL,
    SUM(amount) AS TotalVentas
FROM SALES
GROUP BY MONTH(date), MONTHNAME(date)
ORDER BY MONTH(date);
```

The result is automatically turned into a **bar chart** or **line chart**, depending on what you select in the interface.

To see a complete example, you can review this sample notebook I have created:
<figure>
<img src="./Uso_Notebooks.png" alt="Chart of Notebook usage on IBM i" />
<figcaption>Fig 2. Chart of Notebook usage on IBM i.</figcaption>
</figure>

In this notebook, you can see that there are some tags as comments that allow us to configure aspects of the chart, such as the title, the axis labels, and the chart type (bar, line, pie, etc.). This gives us additional control over how the data is presented visually. 

The tags are:
```sql
-- chart: bar
-- title: Planilla de Empleados - Salarios
-- y: Salario de Empleados
-- hideStatement: true
select codigo_empleado as LABEL, 
       salario 
from detri1.planilla;
```
Where each tag has a specific purpose to customize the visualization of the chart generated from the SQL query:
- `-- chart: bar`  
  Defines the type of chart to generate. In this case, a bar chart. Other types can be `line`, `pie`, `doughnut`, `polarArea`, and `radar`.
- `-- title: Planilla de Empleados - Salarios`  
  Sets the title of the chart, providing context about the data being visualized.
- `-- y: Salario de Empleados`  
  Label for the Y axis of the chart, indicating what that dimension represents.
- `-- hideStatement: true`  
  Only accepts `true`. If set to `true`, the SQL statement will not be shown in the notebook, leaving only the chart visible. This is useful for presentations or reports where only the visual results are to be shown.

# 🧠 A new style of work for IBM i

This kind of tool breaks the paradigm of:

> “On IBM i things are done this way because they have always been done this way.”

Now we work with:

- **Visual environments**  
- **Integrated data analysis**  
- **Interactivity**  
- **Dynamic documentation**  
- **DevOps integration**  
- **Productivity driven by modern tools**

For those of us who come from green screens, this means a profound modernization of the developer experience. We no longer just write code. Now we **write knowledge**.

And that changes everything; today we can establish a new paradigm on IBM i:
> “On IBM i things are done this way because it is the most efficient and productive way to work.”


# 🔮 Conclusion  
*Notebooks* in the Db2 for i extension represent a natural and necessary evolution:

- They provide clarity
- They increase productivity
- They facilitate analysis
- They improve documentation
- They integrate SQL, CL, and Markdown into a single flow
- They modernize the way we understand, teach, and share work on IBM i

Each notebook is a complete story:  
**what you did, how you did it, why you did it, and what result you obtained.**

And that, for those of us who love this system, is a historic leap comparable to when we migrated from SEU to RDi, or from fixed-format RPG to Full Free, **but this time, with charts, visualizations, and all the power of VS Code.**

If you haven't tried them yet, I invite you to do so, because I am sure they will change the way you work with IBM i forever and open up new possibilities you never imagined before. Helping our beloved system evolve alongside us, toward a brighter and more productive future. 

Remember:
> “It is not just about modernizing the code, but about modernizing the way we think and work.”

# 📎 Useful resources

- VS Code — Custom Notebooks
  <p>
    <a href="https://code.visualstudio.com/blogs/2021/11/08/custom-notebooks" target="_blank">Custom Notebooks in VS Code</a>.
  </p>

- Db2 for i Extension — Documentation
  <p>
    <a href="https://codefori.github.io/docs/extensions/db2i/" target="_blank">Db2 for i Documentation</a>.
  </p>

- Charting with SQL in Db2 for i  
  <p>
    <a href="https://codefori.github.io/docs/extensions/db2i/#charting-with-sql" target="_blank">Charting with SQL in Db2 for i</a>.
  </p>