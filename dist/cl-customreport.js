define(["jquery","underscore","qlik","ng!$q","ng!$http","./properties","./initialproperties","client.utils/state","./lib/js/extensionUtils","./lib/external/Sortable/Sortable","text!./lib/css/style.css","text!./lib/partials/customreport.ng.html"],function(a,b,c,d,e,f,g,h,i,j,k,l){"use strict";return i.addStyleToHeader(k),{definition:f,initialProperties:g,snapshot:{canTakeSnapshot:!1},resize:function(a){a.context.clientHeight<300?this.$scope.collapsed||(this.$scope.collapsed=!0,this.$scope.updateTable()):this.$scope.collapsed&&(this.$scope.collapsed=!1,this.$scope.updateTable()),this.$scope.size.clientHeight=a.context.clientHeight,this.$scope.size.clientWidth=a.context.clientWidth},paint:function(a){a.context.clientHeight<300?this.$scope.collapsed||(this.$scope.collapsed=!0,this.$scope.updateTable()):this.$scope.collapsed&&(this.$scope.collapsed=!1,this.$scope.updateTable()),this.$scope.size.clientHeight=a.context.clientHeight,this.$scope.size.clientWidth=a.context.clientWidth},getExportRawDataOptions:function(b,c,d){c.getVisualization().then(function(){return a("#cl-customreport-container").scope().collapsed||b.addItem(a("#cl-customreport-container").scope().expanded?{translation:"Show fields/sortbar",tid:"Collapse",icon:"icon-minimize",select:function(){a("#cl-customreport-container").scope().collapse()}}:{translation:"Hide fields/sortbar",tid:"Expand",icon:"icon-maximize",select:function(){a("#cl-customreport-container").scope().expand()}}),b.addItem({translation:"contextMenu.export",tid:"export",icon:"icon-toolbar-sharelist",select:function(){a("#cl-customreport-container").scope().exportData("exportToExcel")}}),void d.resolve()})},template:l,controller:["$scope",function(e){function f(){var a=d.defer();return i.getAppObjectList("masterobject",function(c){e.data.masterObjectList=b.reduce(c.qAppObjectList.qItems,function(a,c){return"table"==c.qData.visualization&&("All tables"==e.data.tag?a.push(c):b.each(c.qMeta.tags,function(b){b==e.data.tag&&a.push(c)})),a},[]),a.resolve(!0)}),a.promise}function g(){i.getList("MeasureList",function(a){e.data.masterMeasures=a.qMeasureList}),i.getList("DimensionList",function(a){e.data.masterDimensions=a.qDimensionList})}e.size={clientHeight:-1,clientWidth:-1},e.expanded=!1,e.collapsed=!1,e.data={tag:null,tagColor:!0,sortOrder:"SortByA",activeTable:null,displayText:"Custom Report",masterObjectList:[],masterDimensions:[],masterMeasures:[]},e.report={tableID:"",title:null,report:[],dimensions:[],measures:[],interColumnSortOrder:[]},e.reportConfig={group:{name:"report",put:["dim","measure"]},animation:150,ghostClass:"ghost",onSort:function(a){e.report.state.splice(a.newIndex,0,e.report.state.splice(a.oldIndex,1)[0]),e.updateTable()}};var i=c.currApp(),k=e.$parent.layout.qExtendsId?e.$parent.layout.qExtendsId:e.$parent.layout.qInfo.qId;e.getClass=function(){return h.isInAnalysisMode()?"":"no-interactions"},e.loadActiveTable=function(){var a=d.defer();return e.report.state=[],e.updateTable(),null!==e.data.activeTable?setTimeout(function(){i.getObjectProperties(e.data.activeTable.qInfo.qId).then(function(c){e.report.title=c.properties.title;var d=-1,f=b.map(c._properties.qHyperCubeDef.qDimensions,function(a){if(d+=1,a.qLibraryId){var c=b.find(e.data.masterDimensions.qItems,function(b){return b.qInfo.qId==a.qLibraryId}),f=a;return f.qType="dimension",{title:c.qMeta.title,description:c.qMeta.description,columnOptions:f,type:"dimension",selected:!1,dataId:d}}return{title:""==a.qDef.qFieldLabels[0]?a.qDef.qFieldDefs[0]:a.qDef.qFieldLabels[0],description:"",columnOptions:a,type:"dimension",selected:!1,dataId:d}});e.report.dimensions="SortByA"==e.data.sortOrder?b.sortBy(f,function(a){return a.title}):f;var g=b.map(c._properties.qHyperCubeDef.qMeasures,function(a){if(d+=1,a.qLibraryId){var c=b.find(e.data.masterMeasures.qItems,function(b){return b.qInfo.qId==a.qLibraryId}),f=a;return f.qType="measure",{title:c.qMeta.title,description:c.qMeta.description,columnOptions:f,type:"measure",selected:!1,dataId:d}}return{title:a.qDef.qLabel?a.qDef.qLabel:a.qDef.qDef,description:"",columnOptions:a,type:"measure",selected:!1,dataId:d}});e.report.measures="SortByA"==e.data.sortOrder?b.sortBy(g,function(a){return a.title}):g,a.resolve(!0)})},500):a.resolve(!1),a.promise},e.changeTable=function(){var a={},b=JSON.parse(localStorage.getItem(k));void 0!=b&&void 0!=b.states&&(a=b.states[e.data.activeTable.qInfo.qId],a&&(e.report.interColumnSortOrder=a.qInterColumnSortOrder?a.qInterColumnSortOrder:[])),e.setReportState(a)},e.createTable=function(){var b=d.defer();return a(".rain").show(),e.loadActiveTable().then(function(){i.visualization.create("table",[],{title:""==e.report.title?e.data.activeTable.qMeta.title:e.report.title}).then(function(c){e.report.tableID=c.id,a(".rain").hide(),c.show("customreporttable"),b.resolve(!0)})}),b.promise},e.getInterColumnSortOrder=function(){var a=d.defer();return 0==e.report.interColumnSortOrder.length?i.getObject(e.report.tableID).then(function(c){c.getEffectiveProperties().then(function(c){var d=c.qHyperCubeDef.qDimensions.length,f=[];b.each(c.qHyperCubeDef.qInterColumnSortOrder,function(a){if(a>=d){var b={dataId:c.qHyperCubeDef.qMeasures[a-d].dataId,type:"measure"};b.qSortBy=c.qHyperCubeDef.qMeasures[a-d].qSortBy,c.qHyperCubeDef.qMeasures[a-d].qDef.qReverseSort&&(b.qReverseSort=!0),f.push(b)}else{var b={dataId:c.qHyperCubeDef.qDimensions[a].dataId,type:"dimension"};c.qHyperCubeDef.qDimensions[a].qDef.qReverseSort&&(b.qReverseSort=!0),f.push(b)}}),e.report.interColumnSortOrder=f,a.resolve(!0)})}):a.resolve(!1),a.promise},e.setReportState=function(a){e.createTable().then(function(){var c=[];b.each(a.itemIds,function(a){var b=e.report.dimensions.map(function(a){return a.dataId}).indexOf(a);b>-1?(e.report.dimensions[b].selected=!0,c.push(e.report.dimensions[b])):(b=e.report.measures.map(function(a){return a.dataId}).indexOf(a),b>-1&&(e.report.measures[b].selected=!0,c.push(e.report.measures[b])))}),e.report.state=c,e.updateTable()})},e.updateTable=function(){if(""!=e.report.tableID){if(e.report.state.length>0){var c=b.reduce(e.report.state,function(a,b){return"dimension"==b.type&&(b.columnOptions.dataId=b.dataId,a.push(b.columnOptions)),a},[]),d=b.reduce(e.report.state,function(a,b){return"measure"==b.type&&(b.columnOptions.dataId=b.dataId,a.push(b.columnOptions)),a},[]),f=[],g=0,h=0;b.each(e.report.state,function(a){"measure"==a.type?(f.push(c.length+g),g+=1):(f.push(h),h+=1)});for(var j=[],k=0;k<e.report.state.length;k++)j.push(-1);e.getInterColumnSortOrder().then(function(){var a=[];if(b.each(e.report.interColumnSortOrder,function(b){if("measure"==b.type){var e=d.map(function(a){return a.dataId}).indexOf(b.dataId);e>-1&&(a.push(e+h),d[e].qSortBy=b.qSortBy,b.qReverseSort&&(d[e].qDef.autoSort=!1,d[e].qDef.qReverseSort=b.qReverseSort))}else{var e=c.map(function(a){return a.dataId}).indexOf(b.dataId);e>-1&&(a.push(e),b.qReverseSort&&(c[e].qDef.autoSort=!1,c[e].qDef.qReverseSort=b.qReverseSort))}}),a.length!=f.length){var g=b.difference(f,a);b.each(g,function(b){a.push(b)})}i.getObject(e.report.tableID).then(function(b){b.clearSoftPatches();var g=[{qOp:"replace",qPath:"qHyperCubeDef/qDimensions",qValue:JSON.stringify(c)},{qOp:"replace",qPath:"qHyperCubeDef/qMeasures",qValue:JSON.stringify(d)},{qOp:"replace",qPath:"qHyperCubeDef/columnOrder",qValue:JSON.stringify(f)},{qOp:"replace",qPath:"qHyperCubeDef/columnWidths",qValue:JSON.stringify(j)},{qOp:"replace",qPath:"qHyperCubeDef/qInterColumnSortOrder",qValue:JSON.stringify(a)}];b.applyPatches(g,!0),e.serializeReport()})})}else i.getObject(e.report.tableID).then(function(a){a.clearSoftPatches(),e.report.interColumnSortOrder=[],e.serializeReport()});a(".rain").hide()}},e.selectItem=function(a){var b=e.report.state.map(function(a){return a.dataId}).indexOf(a.dataId);b>-1?(a.selected=!1,e.report.state.splice(b,1)):(a.selected=!0,e.report.state.push(a)),e.updateTable()},e.clearAll=function(){b.each(e.report.dimensions,function(a){a.selected=!1}),b.each(e.report.measures,function(a){a.selected=!1}),e.report.state=[],e.updateTable()},e.removeItem=function(a){if(e.report.state=b.without(e.report.state,a),"measure"==a.type){var c=e.report.measures.map(function(a){return a.dataId}).indexOf(a.dataId);e.report.measures[c].selected=!1}else{var c=e.report.dimensions.map(function(a){return a.dataId}).indexOf(a.dataId);e.report.dimensions[c].selected=!1}e.updateTable()},e.expand=function(){e.expanded=!0,e.updateTable()},e.collapse=function(){e.expanded=!1,e.updateTable()},e.exportData=function(a){if(e.report.state.length>0){var b={};switch(a){case"exportToExcel":b={download:!0};break;case"exportAsCSV":b={format:"CSV_C",download:!0};break;case"exportAsCSVTab":b={format:"CSV_T",download:!0};break;case"exportToClipboard":b={download:!0}}i.visualization.get(e.report.tableID).then(function(a){a.table.exportData(b)})}},e.serializeReport=function(){var a=JSON.parse(localStorage.getItem(k));(null===a||void 0===a||void 0===a.states)&&(a={activeTableId:"",states:{}});var c=[];b.each(e.report.state,function(a){c.push(a.dataId)}),e.getInterColumnSortOrder().then(function(){var b={qId:e.data.activeTable.qInfo.qId,itemIds:c,qInterColumnSortOrder:e.report.interColumnSortOrder};a.activeTableId=b.qId,a.states[b.qId]=b,e.report.interColumnSortOrder=[],localStorage.setItem(k,JSON.stringify(a))})},e.deserializeReport=function(){var a={},c=JSON.parse(localStorage.getItem(k));void 0!=c&&void 0!=c.states&&(a=c.states[c.activeTableId],e.report.interColumnSortOrder=a.qInterColumnSortOrder?a.qInterColumnSortOrder:[],e.data.activeTable=b.find(e.data.masterObjectList,function(b){return b.qInfo.qId==a.qId}),e.setReportState(a))},e.$on("$destroy",function(){e.serializeReport()}),e.$watchCollection("layout.props.tagSetting",function(a){e.data.tag=a,f()}),e.$watchCollection("layout.props.tagColor",function(a){e.data.tagColor=a}),e.$watchCollection("layout.props.displayText",function(a){e.data.displayText=a}),e.$watchCollection("layout.props.dimensionSortOrder",function(a){e.data.sortOrder=a,e.loadActiveTable()}),e.getListMaxHeight=function(a){var b=38,c=e.report.dimensions.length,d=e.report.measures.length,f=140,g=(e.size.clientHeight-f)/2,h=b*c>g?0:g-b*c,i=b*d>g?0:g-b*d;return c>0?"dimension"==a?{"max-height":g+i+"px"}:{"max-height":g+h+"px"}:{height:g+"px"}},e.getTableHeight=function(){var b=70;a("#reportSortable").height();var c=a("#reportSortable").height();return e.expanded?{height:e.size.clientHeight+"px"}:{height:e.size.clientHeight-b-c+"px","padding-top":"18px"}},e.getContainerWidth=function(a){var b=220,c={};return c="left"==a?b:e.expanded?e.size.clientWidth:e.size.clientWidth-b-20,{width:c+"px"}},g(),f().then(function(){var b=document.getElementById("reportSortable");j.create(b,e.reportConfig),e.deserializeReport(),a(".rain").hide()})}]}});