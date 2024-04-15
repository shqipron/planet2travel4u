# Development

<ul>
<li>Neue Features werden vom main-branch erstellt.
<li>Ist ein Feature-branch abgeschlossen, kann dieser mit dem main-branch gemerged werden.
<li>Etwaige Meilensteine werden via Tag im Main-branch gekenzeichnet.
<ul>
<br>
 
> **Note**
> Features sind neu umzusetzende Implementierungen
 
```mermaid

gitGraph
checkout main
commit id:"initial"
 branch feature/menue
 commit id:"Setup Gui"
 commit id:"Functionality Gui"
 checkout main
 branch feature/listFunction
 commit id:"implement function"
 checkout main
 merge feature/listFunction
 merge feature/menue
 branch feature/sortList
 commit id:"sortList"
 checkout main
 merge feature/sortList
  

```
