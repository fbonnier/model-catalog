// import { Typography } from "@material-ui/core";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableRow from "@material-ui/core/TableRow";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Plotly from "plotly.js";
// import React from "react";
// import createPlotlyComponent from "react-plotly.js/factory";
// import { updateHash } from "./globals";
// import LoadingIndicator from "./LoadingIndicator";
// import ResultDetail from "./ResultDetail";
// import Theme from "./theme";

// export default class VerificationMethodTable extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             results: [],
//             resultDetailOpen: false,
//             currentResult: null,
//             test_ids: [],
//         };

//         this.handleResultEntryClick = this.handleResultEntryClick.bind(this);
//         this.handleResultDetailClose = this.handleResultDetailClose.bind(this);
//     }

//     // convertResultsFormat = (results) => {
//     //     // converts to format required by groupResults()
//     //     // i.e. same format as used by model/test detail page
//     //     let req_results = [];
//     //     results.forEach(function (result, index) {
//     //         req_results.push({
//     //             "id": result.id,
//     //             "model_instance_id": result.model_instance_id,
//     //             "test_instance_id": result.test_instance_id,
//     //             "test_version": result.test_instance.version,
//     //             "score": result.score,
//     //             "score_type": result.test.score_type,
//     //             "data_type": result.test.data_type,
//     //             "timestamp": result.timestamp,
//     //             "model_id": result.model.id,
//     //             "model_name": result.model.name,
//     //             "model_alias": result.model.alias,
//     //             "model_version": result.model_instance.version,
//     //             "test_id": result.test.id,
//     //             "test_name": result.test.name,
//     //             "test_alias": result.test.alias
//     //         })
//     //     });
//     //     return req_results;
//     // }

//     // groupResults = (results) => {
//     //     console.log(results);
//     //     // will be a multi-D dict {test -> test instance -> model -> model instance} with list as values
//     //     var dict_results = {};

//     //     // check if test exists
//     //     results.forEach(function (result, index) {
//     //         if (!(result.test_id in dict_results)) {
//     //             dict_results[result.test_id] = {
//     //                 test_id: result.test_id,
//     //                 test_name: result.test_name,
//     //                 test_alias: result.test_alias,
//     //                 test_instances: {},
//     //             };
//     //         }
//     //         // check if test instance exists inside test
//     //         if (
//     //             !(
//     //                 result.test_instance_id in
//     //                 dict_results[result.test_id]["test_instances"]
//     //             )
//     //         ) {
//     //             dict_results[result.test_id]["test_instances"][
//     //                 result.test_instance_id
//     //             ] = {
//     //                 test_inst_id: result.test_instance_id,
//     //                 test_version: result.test_version,
//     //                 data_type: result.data_type,
//     //                 score_type: result.score_type,
//     //                 models: {},
//     //             };
//     //         }
//     //         // check if model exists for this test instance
//     //         if (
//     //             !(
//     //                 result.model_id in
//     //                 dict_results[result.test_id]["test_instances"][
//     //                 result.test_instance_id
//     //                 ]["models"]
//     //             )
//     //         ) {
//     //             dict_results[result.test_id]["test_instances"][
//     //                 result.test_instance_id
//     //             ]["models"][result.model_id] = {
//     //                 model_id: result.model_id,
//     //                 model_name: result.model_name,
//     //                 model_alias: result.model_alias,
//     //                 model_instances: {},
//     //             };
//     //         }
//     //         // check if model instance exists for this model
//     //         if (
//     //             !(
//     //                 result.model_instance_id in
//     //                 dict_results[result.test_id]["test_instances"][
//     //                 result.test_instance_id
//     //                 ]["models"][result.model_id]["model_instances"]
//     //             )
//     //         ) {
//     //             dict_results[result.test_id]["test_instances"][
//     //                 result.test_instance_id
//     //             ]["models"][result.model_id]["model_instances"][
//     //                 result.model_instance_id
//     //             ] = {
//     //                 model_inst_id: result.model_instance_id,
//     //                 model_version: result.model_version,
//     //                 results: [],
//     //             };
//     //         }
//     //         // add result to list of model instance results for above test instance
//     //         dict_results[result.test_id]["test_instances"][
//     //             result.test_instance_id
//     //         ]["models"][result.model_id]["model_instances"][
//     //             result.model_instance_id
//     //         ]["results"].push({
//     //             result_id: result.id,
//     //             score: result.score,
//     //             timestamp: result.timestamp,
//     //             result_json: result,
//     //         });
//     //     });

//         // NOT NEEDED HERE?
//         // // insert empty lists for (test_instance, model_instance) combos without results
//         // results.forEach(function (result) {
//         //   list_model_versions.forEach(function (m_inst) {
//         //     if (!(m_inst["model_inst_id"] in dict_results[result.test_id]["test_instances"][result.test_instance_id]["results"])) {
//         //       dict_results[result.test_id]["test_instances"][result.test_instance_id]["results"][m_inst["model_inst_id"]] = [];
//         //     }
//         //   })
//         // })

//         // sorting tests by test name/alias (whichever is displayed)
//     //     var temp_sorted = {};
//     //     Object.keys(dict_results)
//     //         .sort(function (a, b) {
//     //             var parent = dict_results;
//     //             var t_a_display = parent[a].test_alias
//     //                 ? parent[a].test_alias
//     //                 : parent[a].test_name;
//     //             var t_b_display = parent[b].test_alias
//     //                 ? parent[b].test_alias
//     //                 : parent[b].test_name;
//     //             if (t_a_display < t_b_display) {
//     //                 return -1;
//     //             }
//     //             if (t_a_display > t_b_display) {
//     //                 return 1;
//     //             }
//     //             return 0;
//     //         })
//     //         .forEach(function (key) {
//     //             temp_sorted[key] = dict_results[key];
//     //         });
//     //     dict_results = temp_sorted;

//     //     // sorting test versions within test by timestamp, oldest to newest
//     //     Object.keys(dict_results).forEach(function (test_id) {
//     //         var temp_sorted = {};
//     //         Object.keys(dict_results[test_id]["test_instances"])
//     //             .sort(function (a, b) {
//     //                 var parent = dict_results[test_id]["test_instances"];
//     //                 var t_a_timestamp = parent[a].timestamp;
//     //                 var t_b_timestamp = parent[b].timestamp;
//     //                 if (t_a_timestamp < t_b_timestamp) {
//     //                     return -1;
//     //                 }
//     //                 if (t_a_timestamp > t_b_timestamp) {
//     //                     return 1;
//     //                 }
//     //                 return 0;
//     //             })
//     //             .forEach(function (key) {
//     //                 temp_sorted[key] =
//     //                     dict_results[test_id]["test_instances"][key];
//     //             });
//     //         dict_results[test_id]["test_instances"] = temp_sorted;
//     //     });

//     //     // sorting models within each test instance by model name/alias (whichever is displayed)
//     //     Object.keys(dict_results).forEach(function (test_id) {
//     //         Object.keys(dict_results[test_id]["test_instances"]).forEach(
//     //             function (test_inst_id) {
//     //                 var temp_sorted = {};
//     //                 Object.keys(
//     //                     dict_results[test_id]["test_instances"][test_inst_id][
//     //                     "models"
//     //                     ]
//     //                 )
//     //                     .sort(function (a, b) {
//     //                         var parent =
//     //                             dict_results[test_id]["test_instances"][
//     //                             test_inst_id
//     //                             ]["models"];
//     //                         var t_a_display = parent[a].model_alias
//     //                             ? parent[a].model_alias
//     //                             : parent[a].model_name;
//     //                         var t_b_display = parent[b].model_alias
//     //                             ? parent[b].model_alias
//     //                             : parent[b].model_name;
//     //                         if (t_a_display < t_b_display) {
//     //                             return -1;
//     //                         }
//     //                         if (t_a_display > t_b_display) {
//     //                             return 1;
//     //                         }
//     //                         return 0;
//     //                     })
//     //                     .forEach(function (key) {
//     //                         temp_sorted[key] =
//     //                             dict_results[test_id]["test_instances"][
//     //                             test_inst_id
//     //                             ]["models"][key];
//     //                     });
//     //                 dict_results[test_id]["test_instances"][test_inst_id][
//     //                     "models"
//     //                 ] = temp_sorted;
//     //             }
//     //         );
//     //     });

//     //     // sorting model versions within each model by timestamp, oldest to newest
//     //     Object.keys(dict_results).forEach(function (test_id) {
//     //         Object.keys(dict_results[test_id]["test_instances"]).forEach(
//     //             function (test_inst_id) {
//     //                 Object.keys(
//     //                     dict_results[test_id]["test_instances"][test_inst_id][
//     //                     "models"
//     //                     ]
//     //                 ).forEach(function (model_id) {
//     //                     var temp_sorted = {};
//     //                     Object.keys(
//     //                         dict_results[test_id]["test_instances"][
//     //                         test_inst_id
//     //                         ]["models"][model_id]["model_instances"]
//     //                     )
//     //                         .sort(function (a, b) {
//     //                             var parent =
//     //                                 dict_results[test_id]["test_instances"][
//     //                                 test_inst_id
//     //                                 ]["models"][model_id]["model_instances"];
//     //                             var t_a_timestamp = parent[a].timestamp;
//     //                             var t_b_timestamp = parent[b].timestamp;
//     //                             if (t_a_timestamp < t_b_timestamp) {
//     //                                 return -1;
//     //                             }
//     //                             if (t_a_timestamp > t_b_timestamp) {
//     //                                 return 1;
//     //                             }
//     //                             return 0;
//     //                         })
//     //                         .forEach(function (key) {
//     //                             temp_sorted[key] =
//     //                                 dict_results[test_id]["test_instances"][
//     //                                 test_inst_id
//     //                                 ]["models"][model_id]["model_instances"][
//     //                                 key
//     //                                 ];
//     //                         });
//     //                     dict_results[test_id]["test_instances"][test_inst_id][
//     //                         "models"
//     //                     ][model_id]["model_instances"] = temp_sorted;
//     //                 });
//     //             }
//     //         );
//     //     });

//     //     // sort each list of dicts (each dict being a result), newest to oldest
//     //     Object.keys(dict_results).forEach(function (test_id) {
//     //         Object.keys(dict_results[test_id]["test_instances"]).forEach(
//     //             function (test_inst_id) {
//     //                 Object.keys(
//     //                     dict_results[test_id]["test_instances"][test_inst_id][
//     //                     "models"
//     //                     ]
//     //                 ).forEach(function (model_id) {
//     //                     Object.keys(
//     //                         dict_results[test_id]["test_instances"][
//     //                         test_inst_id
//     //                         ]["models"][model_id]["model_instances"]
//     //                     ).forEach(function (model_inst_id) {
//     //                         dict_results[test_id]["test_instances"][
//     //                             test_inst_id
//     //                         ]["models"][model_id]["model_instances"][
//     //                             model_inst_id
//     //                         ]["results"].sort(function (a, b) {
//     //                             if (a.timestamp < b.timestamp) {
//     //                                 return 1;
//     //                             }
//     //                             if (a.timestamp > b.timestamp) {
//     //                                 return -1;
//     //                             }
//     //                             return 0;
//     //                         });
//     //                     });
//     //                 });
//     //             }
//     //         );
//     //     });
//     //     console.log(dict_results);
//     //     return dict_results;
//     // };

//     handleResultEntryClick(result) {
//         this.setState({
//             resultDetailOpen: true,
//             currentResult: result,
//         });
//         updateHash("result_id." + result.id);
//     }

//     handleResultDetailClose() {
//         this.setState({
//             resultDetailOpen: false,
//             currentResult: null,
//         });
//         updateHash("");
//     }

//     renderResultsFigures(dict_results) {
//         var test_ids = this.state.test_ids;
//         // determine list of tests to be plotted
//         if (test_ids.length < 1) {
//             for (const test_id of Object.keys(dict_results)) {
//                 test_ids.push(test_id);
//             }
//         }

//         if (test_ids.length > 0) {
//             return (
//                 <Grid container>
//                     {/* <Grid item>
//                         {test_ids.map((test_id) => (
//                             <Accordion
//                                 defaultExpanded={true}
//                                 key={test_id}
//                                 style={{ backgroundColor: Theme.lightBackground }}
//                             >
//                                 <AccordionSummary
//                                     expandIcon={<ExpandMoreIcon />}
//                                     aria-controls="panel1a-content"
//                                     id={test_id}
//                                 >
//                                     <Typography variant="subtitle1">
//                                         Test:{" "}
//                                         <b>
//                                             {dict_results[test_id].test_alias
//                                                 ? dict_results[test_id]
//                                                     .test_alias
//                                                 : dict_results[test_id]
//                                                     .test_name}
//                                         </b>
//                                     </Typography>
//                                 </AccordionSummary>
//                                 <AccordionDetails>
//                                     <Grid container spacing={3}>
//                                         {Object.entries(
//                                             dict_results[test_id][
//                                             "test_instances"
//                                             ]
//                                         ).map(
//                                             ([
//                                                 test_inst_id,
//                                                 test_inst_entry,
//                                             ]) => (
//                                                 <Grid item key={test_inst_id}>
//                                                     <Grid container>
//                                                         <Grid item>
//                                                             <ResultsFiguresTestIntance
//                                                                 test_inst_id={
//                                                                     test_inst_id
//                                                                 }
//                                                                 test_inst_entry={
//                                                                     test_inst_entry
//                                                                 }
//                                                                 key={
//                                                                     test_inst_id
//                                                                 }
//                                                                 handleResultEntryClick={
//                                                                     this
//                                                                         .handleResultEntryClick
//                                                                 }
//                                                             />
//                                                         </Grid>
//                                                     </Grid>
//                                                 </Grid>
//                                             )
//                                         )}
//                                     </Grid>
//                                 </AccordionDetails>
//                             </Accordion>
//                         ))}
//                     </Grid> */}
//                 </Grid>
//             );
//         } else {
//             return "";
//         }
//     }

//     renderNoResults() {
//         return (
//             <Typography variant="h6">
//                 <br />
//                 No results have yet been registered for this model!
//             </Typography>
//         );
//     }

//     render() {
//         var content = "";
//         var resultDetail = "";

//         if (this.props.loadingResult) {
//             return <LoadingIndicator position="absolute" />;
//         }

//         const results = this.props.results;
//         if (results.length === 0) {
//             content = this.renderNoResults();
//         } else {
//             // // 'multiResultsCompare' required below as single model/test detail page fetches results
//             // // in a particular format [using datastore. getResultsByModel()/getResultsByTest()],
//             // // while multi-model/test comparison uses another format
//             // // [using datastore.getResultsByModelInstances()/getResultsByTestInstance()]
//             // // for model/test detail page, 'multiResultsCompare' param is absent (i.e. false)
//             // let results_grouped = null;
//             // if (this.props.multiResultsCompare) {
//             //     results_grouped = this.groupResults(this.convertResultsFormat(results));
//             // } else {
//             //     results_grouped = this.groupResults(results);
//             // }
//             // content = this.renderResultsFigures(results_grouped);
//         }

//         if (this.state.currentResult) {
//             resultDetail = (
//                 <ResultDetail
//                     open={this.state.resultDetailOpen}
//                     result={this.state.currentResult}
//                     onClose={this.handleResultDetailClose}
//                 />
//             );
//         }
//         return (
//             <>
//                 <Grid container>
//                     <Grid item xs={12}>
//                         {content}
//                     </Grid>
//                 </Grid>
//                 <div>{resultDetail}</div>
//             </>
//         );
//     }
// }
