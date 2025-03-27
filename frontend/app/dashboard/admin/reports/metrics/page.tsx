// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { useToast } from "@/components/ui/use-toast"
// import { Download, Save, Plus, Trash2, BarChart3, PieChart, LineChart } from "lucide-react"
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart as RePieChart,
//   Pie,
//   Cell,
//   LineChart as ReLineChart,
//   Line,
// } from "recharts"

// // Mock data for custom metrics
// const mockStudentData = [
//   {
//     id: "1",
//     name: "Arjun Patel",
//     communication: {
//       followingInstructions: 5,
//       politeWords: 3.5,
//       askingQuestions: 3,
//       conversation: 3,
//       describing: 4,
//       commenting: 3,
//       emotionalCommunication: 3.5,
//       sentenceFormation: 4.5,
//     },
//     cognition: {
//       prediction: 4.5,
//       logicalSequencing: 4.5,
//       problemSolving: 4,
//       causeEffect: 4.5,
//       decisionMaking: 4.5,
//       oddOneOut: 4.5,
//     },
//     functional: {
//       copyingDrawing: 4.5,
//       pasting: 4.5,
//       folding: 3.5,
//       cutting: 3.5,
//       kitchenUtensils: 4.5,
//       ingredients: 4.5,
//       pouring: 4.5,
//       scooping: 4.5,
//       personalHygiene: 3,
//       foldingClothes: 4.5,
//       fillingWater: 4.5,
//       packing: 4.5,
//       wiping: 4.5,
//       groupActivities: 4,
//     },
//     attendance: 85.9,
//   },
//   {
//     id: "2",
//     name: "Meera Singh",
//     communication: {
//       followingInstructions: 4,
//       politeWords: 4.5,
//       askingQuestions: 3.5,
//       conversation: 4,
//       describing: 3.5,
//       commenting: 3.5,
//       emotionalCommunication: 4,
//       sentenceFormation: 4,
//     },
//     cognition: {
//       prediction: 4,
//       logicalSequencing: 4,
//       problemSolving: 3.5,
//       causeEffect: 4,
//       decisionMaking: 4,
//       oddOneOut: 3.5,
//     },
//     functional: {
//       copyingDrawing: 4,
//       pasting: 4,
//       folding: 4,
//       cutting: 3,
//       kitchenUtensils: 4,
//       ingredients: 4,
//       pouring: 4,
//       scooping: 4,
//       personalHygiene: 3.5,
//       foldingClothes: 4,
//       fillingWater: 4.5,
//       packing: 4,
//       wiping: 4,
//       groupActivities: 4.5,
//     },
//     attendance: 92.2,
//   },
//   {
//     id: "3",
//     name: "Rahul Verma",
//     communication: {
//       followingInstructions: 3.5,
//       politeWords: 3,
//       askingQuestions: 2.5,
//       conversation: 2.5,
//       describing: 3,
//       commenting: 2.5,
//       emotionalCommunication: 3,
//       sentenceFormation: 3.5,
//     },
//     cognition: {
//       prediction: 3.5,
//       logicalSequencing: 3.5,
//       problemSolving: 3,
//       causeEffect: 3.5,
//       decisionMaking: 3,
//       oddOneOut: 3.5,
//     },
//     functional: {
//       copyingDrawing: 3.5,
//       pasting: 4,
//       folding: 3,
//       cutting: 2.5,
//       kitchenUtensils: 3.5,
//       ingredients: 3.5,
//       pouring: 4,
//       scooping: 4,
//       personalHygiene: 2.5,
//       foldingClothes: 3.5,
//       fillingWater: 4,
//       packing: 3.5,
//       wiping: 3.5,
//       groupActivities: 3,
//     },
//     attendance: 78.1,
//   },
//   {
//     id: "4",
//     name: "Priya Sharma",
//     communication: {
//       followingInstructions: 4.5,
//       politeWords: 4,
//       askingQuestions: 4,
//       conversation: 4.5,
//       describing: 4.5,
//       commenting: 4,
//       emotionalCommunication: 4.5,
//       sentenceFormation: 4,
//     },
//     cognition: {
//       prediction: 4.5,
//       logicalSequencing: 4,
//       problemSolving: 4.5,
//       causeEffect: 4,
//       decisionMaking: 4.5,
//       oddOneOut: 4,
//     },
//     functional: {
//       copyingDrawing: 4,
//       pasting: 4.5,
//       folding: 4,
//       cutting: 4,
//       kitchenUtensils: 4.5,
//       ingredients: 4.5,
//       pouring: 4.5,
//       scooping: 4.5,
//       personalHygiene: 4,
//       foldingClothes: 4.5,
//       fillingWater: 4.5,
//       packing: 4.5,
//       wiping: 4.5,
//       groupActivities: 4.5,
//     },
//     attendance: 95.3,
//   },
//   {
//     id: "5",
//     name: "Vikram Malhotra",
//     communication: {
//       followingInstructions: 3,
//       politeWords: 2.5,
//       askingQuestions: 2,
//       conversation: 2,
//       describing: 2.5,
//       commenting: 2,
//       emotionalCommunication: 2.5,
//       sentenceFormation: 3,
//     },
//     cognition: {
//       prediction: 3,
//       logicalSequencing: 3,
//       problemSolving: 2.5,
//       causeEffect: 3,
//       decisionMaking: 2.5,
//       oddOneOut: 3,
//     },
//     functional: {
//       copyingDrawing: 3,
//       pasting: 3.5,
//       folding: 2.5,
//       cutting: 2,
//       kitchenUtensils: 3,
//       ingredients: 3,
//       pouring: 3.5,
//       scooping: 3.5,
//       personalHygiene: 2,
//       foldingClothes: 3,
//       fillingWater: 3.5,
//       packing: 3,
//       wiping: 3,
//       groupActivities: 2.5,
//     },
//     attendance: 65.6,
//   },
// ]

// // Sample custom metrics
// const sampleCustomMetrics = [
//   {
//     id: "1",
//     name: "Communication Effectiveness",
//     description: "Measures overall communication effectiveness based on key skills",
//     formula: "Average of (Following Instructions, Sentence Formation, Describing)",
//     fields: ["communication.followingInstructions", "communication.sentenceFormation", "communication.describing"],
//     operation: "average",
//     chartType: "bar",
//   },
//   {
//     id: "2",
//     name: "Self-Care Independence",
//     description: "Measures independence in self-care activities",
//     formula: "Average of (Personal Hygiene, Folding Clothes, Filling Water, Packing)",
//     fields: [
//       "functional.personalHygiene",
//       "functional.foldingClothes",
//       "functional.fillingWater",
//       "functional.packing",
//     ],
//     operation: "average",
//     chartType: "pie",
//   },
//   {
//     id: "3",
//     name: "Attendance vs. Performance",
//     description: "Correlates attendance with overall skill performance",
//     formula: "Comparison of attendance percentage with average of all skill scores",
//     fields: ["attendance"],
//     operation: "correlation",
//     chartType: "line",
//   },
// ]

// // Helper function to calculate metric values
// const calculateMetricValue = (student, metric) => {
//   if (metric.operation === "average") {
//     let sum = 0
//     let count = 0

//     metric.fields.forEach((field) => {
//       const [category, subField] = field.split(".")
//       if (student[category] && student[category][subField] !== undefined) {
//         sum += student[category][subField]
//         count++
//       }
//     })

//     return count > 0 ? (sum / count).toFixed(1) : 0
//   }

//   if (metric.operation === "correlation") {
//     // For correlation metrics, we just return the attendance for now
//     // In a real app, you would calculate a proper correlation
//     return student.attendance
//   }

//   return 0
// }

// // Prepare chart data for a metric
// const prepareChartData = (students, metric) => {
//   return students.map((student) => ({
//     name: student.name,
//     value: Number.parseFloat(calculateMetricValue(student, metric)),
//   }))
// }

// export default function CustomMetricsPage() {
//   const { toast } = useToast()
//   const [activeTab, setActiveTab] = useState("existing")
//   const [customMetrics, setCustomMetrics] = useState(sampleCustomMetrics)
//   const [selectedMetric, setSelectedMetric] = useState(sampleCustomMetrics[0].id)
//   const [chartData, setChartData] = useState(prepareChartData(mockStudentData, sampleCustomMetrics[0]))
  
//   // New metric form state
//   const [newMetric, setNewMetric] = useState({
//     name: "",
//     description: "",
//     fields: [],
//     operation: "average",
//     chartType: "bar",
//   })
  
//   // Available fields for metrics
//   const availableFields = [
//     { id: "communication.followingInstructions", label: "Following Instructions" },
//     { id: "communication.politeWords", label: "Using Polite Words" },
//     { id: "communication.askingQuestions", label: "Asking Questions" },
//     { id: "communication.conversation", label: "Conversation" },
//     { id: "communication.describing", label: "Describing Events/Objects" },
//     { id: "communication.commenting", label: "Commenting" },
//     { id: "communication.emotionalCommunication", label: "Emotional Communication" },
//     { id: "communication.sentenceFormation", label: "Sentence Formation" },
//     { id: "cognition.prediction", label: "Prediction" },
//     { id: "cognition.logicalSequencing", label: "Logical Sequencing" },
//     { id: "cognition.problemSolving", label: "Problem Solving" },
//     { id: "cognition.causeEffect", label: "Cause & Effect" },
//     { id: "cognition.decisionMaking", label: "Decision Making" },
//     { id: "cognition.oddOneOut", label: "Odd One Out" },
//     { id: "functional.copyingDrawing", label: "Copying & Drawing" },
//     { id: "functional.pasting", label: "Pasting" },
//     { id: "functional.folding", label: "Folding" },
//     { id: "functional.cutting", label: "Cutting" },
//     { id: "functional.kitchenUtensils", label: "Kitchen Utensils Knowledge" },
//     { id: "functional.ingredients", label: "Ingredients Knowledge" },
//     { id: "functional.pouring", label: "Pouring" },
//     { id: "functional.scooping", label: "Scooping" },
//     { id: "functional.personalHygiene", label: "Personal Hygiene" },
//     { id: "functional.foldingClothes", label: "Folding Clothes" },
//     { id: "functional.fillingWater", label: "Filling Water" },
//     { id: "functional.packing", label: "Packing" },
//     { id: "functional.wiping", label: "Wiping" },
//     { id: "functional.groupActivities", label: "Group Activities" },
//     { id: "attendance", label: "Attendance Percentage" },
//   ]
  
//   const handleMetricSelect = (metricId) => {
//     setSelectedMetric(metricId)
//     const metric = customMetrics.find(m => m.id === metricId)
//     if (metric) {
//       setChartData(prepareChartData(mockStudentData, metric))
//     }
//   }
  
//   const handleFieldToggle = (fieldId) => {
//     setNewMetric(prev => {
//       const fields = prev.fields.includes(fieldId)
//         ? prev.fields.filter(f => f !== fieldId)
//         : [...prev.fields, fieldId]
      
//       return { ...prev, fields }
//     })
//   }
  
//   const handleCreateMetric = () => {
//     if (!newMetric.name) {
//       toast({
//         title: "Missing information",
//         description: "Please provide a name for your custom metric.",
//         variant: "destructive",
//       })
//       return
//     }
    
//     if (newMetric.fields.length === 0) {
//       toast({
//         title: "Missing fields",
//         description: "Please select at least one field for your metric.",
//         variant: "destructive",
//       })
//       return
//     }
    
//     const newMetricWithId = {
//       ...newMetric,
//       id: `custom-${Date.now()}`,
//       formula: `${newMetric.operation === 'average' ? 'Average' : 'Correlation'} of selected fields`,
//     }
    
//     setCustomMetrics(prev => [...prev, newMetricWithId])
//     setSelectedMetric(newMetricWithId.id)
//     setChartData(prepareChartData(mockStudentData, newMetricWithId))
//     setActiveTab("existing")
    
//     toast({
//       title: "Metric created",
//       description: `Your custom metric "${newMetric.name}" has been created successfully.`,
//     })
    
//     // Reset form
//     setNewMetric({
//       name: "",
//       description: "",
//       fields: [],
//       operation: "average",
//       chartType: "bar",
//     })
//   }
  
//   const handleDeleteMetric = (metricId) => {
//     setCustomMetrics(prev => prev.filter(m => m.id !== metricId))
    
//     if (selectedMetric === metricId) {
//       const remainingMetrics = customMetrics.filter(m => m.id !== metricId)
//       if (remainingMetrics.length > 0) {
//         setSelectedMetric(remainingMetrics[0].id)
//         setChartData(prepareChartData(mockStudentData, remainingMetrics[0]))
//       } else {
//         setSelectedMetric("")
//         setChartData([])
//       }
//     }
    
//     toast({
//       title: "Metric deleted",
//       description: "The custom metric has been deleted successfully.",
//     })
//   }
  
//   const handleDownloadChart = () => {
//     toast({
//       title: "Chart downloaded",
//       description: "The chart has been downloaded as an image.",
//     })
//   }
  
//   const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"]
  
//   const selectedMetricObj = customMetrics.find(m => m.id === selectedMetric) || {}
  
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h2 className="text-2xl font-bold tracking-tight">Custom Metrics</h2>
//           <p className="text-muted-foreground">Create and manage custom metrics for student assessment reports</p>
//         </div>
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="existing">Existing Metrics</TabsTrigger>
//           <TabsTrigger value="create">Create New Metric</TabsTrigger>
//         </TabsList>

//         <TabsContent value="existing" className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-1">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Available Metrics</CardTitle>
//                   <CardDescription>Select a metric to view its data</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {customMetrics.map((metric) => (
//                     <div
//                       key={metric.id}
//                       className={`p-3 border rounded-md cursor-pointer hover:bg-muted transition-colors ${
//                         selectedMetric === metric.id ? "border-primary bg-muted/50" : ""
//                       }`}
//                       onClick={() => handleMetricSelect(metric.id)}
//                     >
//                       <div className="flex items-center justify-between">
//                         <h3 className="font-medium">{metric.name}</h3>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             handleDeleteMetric(metric.id)
//                           }}
//                         >
//                           <Trash2 className="h-4 w-4 text-muted-foreground" />
//                         </Button>
//                       </div>
//                       <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
//                       <div className="flex items-center gap-2 mt-2">
//                         {metric.chartType === "bar" && <BarChart3 className="h-4 w-4 text-muted-foreground" />}
//                         {metric.chartType === "pie" && <PieChart className="h-4 w-4 text-muted-foreground" />}
//                         {metric.chartType === "line" && <LineChart className="h-4 w-4 text-muted-foreground" />}
//                         <span className="text-xs text-muted-foreground">{metric.formula}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="md:col-span-2">
//               {selectedMetric ? (
//                 <Card>
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <div>
//                       <CardTitle>{selectedMetricObj.name}</CardTitle>
//                       <CardDescription>{selectedMetricObj.description}</CardDescription>
//                     </div>
//                     <Button variant="outline" size="sm" onClick={handleDownloadChart}>
//                       <Download className="mr-2 h-4 w-4" />
//                       Download Chart
//                     </Button>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="h-[400px]">
//                       {selectedMetricObj.chartType === "bar" && (
//                         <ResponsiveContainer width="100%" height="100%">
//                           <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis domain={[0, 5]} />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="value" name={selectedMetricObj.name} fill="#8884d8" />
//                           </BarChart>
//                         </ResponsiveContainer>
//                       )}

//                       {selectedMetricObj.chartType === "pie" && (
//                         <ResponsiveContainer width="100%" height="100%">
//                           <RePieChart>
//                             <Pie
//                               data={chartData}
//                               cx="50%"
//                               cy="50%"
//                               labelLine={false}
//                               outerRadius={120}
//                               fill="#8884d8"
//                               dataKey="value"
//                               nameKey="name"
//                               label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                             >
//                               {chartData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                               ))}
//                             </Pie>
//                             <Tooltip formatter={(value) => [`${value}`, selectedMetricObj.name]} />
//                             <Legend />
//                           </RePieChart>
//                         </ResponsiveContainer>
//                       )}

//                       {selectedMetricObj.chartType === "line" && (
//                         <ResponsiveContainer width="100%" height="100%">
//                           <ReLineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Line type="monotone" dataKey="value" name={selectedMetricObj.name} stroke="#8884d8" />
//                           <ReLineChart>
//                         </ResponsiveContainer>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ) : (
//                 <div className="flex items-center justify-center h-full border rounded-lg p-8">
//                   <div className="text-center">
//                     <h3 className="text-lg font-medium mb-2">No Metric Selected</h3>
//                     <p className="text-muted-foreground mb-4">Select a metric from the list to view its data</p>
//                     <Button variant="outline" onClick={() => setActiveTab("create")}>
//                       <Plus className="mr-2 h-4 w-4" />
//                       Create New Metric
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </TabsContent>

//         <TabsContent value="create">
//           <Card>
//             <CardHeader>
//               <CardTitle>Create Custom Metric</CardTitle>
//               <CardDescription>Define a new metric to analyze student performance</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="metric-name">Metric Name</Label>
//                     <Input
//                       id="metric-name"
//                       placeholder="e.g., Communication Effectiveness"
//                       value={newMetric.name}
//                       onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
//                     />
//                   </div>
                  
//                   <div className="space-y-2">
//                     <Label htmlFor="metric-description">Description</Label>
//                     <Input
//                       id="metric-description"
//                       placeholder="e.g., Measures overall communication effectiveness"
//                       value={newMetric.description}
//                       onChange={(e) => setNewMetric({ ...newMetric, description: e.target.value })}
//                     />
//                   </div>
                  
//                   <div className="space-y-2">
//                     <Label htmlFor="operation">Operation</Label>
//                     <Select
//                       value={newMetric.operation}
//                       onValueChange={(value) => setNewMetric({ ...newMetric, operation: value })}
//                     >
//                       <SelectTrigger id="operation">
//                         <SelectValue placeholder="Select operation" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="average">Average (Mean)</SelectItem>
//                         <SelectItem value="correlation">Correlation</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <Label htmlFor="chart-type">Chart Type</Label>
//                     <Select
//                       value={newMetric.chartType}
//                       onValueChange={(value) => setNewMetric({ ...newMetric, chartType: value })}
//                     >
//                       <SelectTrigger id="chart-type">
//                         <SelectValue placeholder="Select chart type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="bar">Bar Chart</SelectItem>
//                         <SelectItem value="pie">Pie Chart</SelectItem>
//                         <SelectItem value="line">Line Chart</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4">
//                   <Label>Select Fields to Include</Label>
//                   <div className="border rounded-md p-4 h-[300px] overflow-y-auto">
//                     <div className="space-y-2">
//                       {availableFields.map((field) => (
//                         <div key={field.id} className="flex items-center space-x-2">
//                           <Checkbox
//                             id={field.id}
//                             checked={newMetric.fields.includes(field.id)}
//                             onCheckedChange={() => handleFieldToggle(field.id)}
//                           />
//                           <label
//                             htmlFor={field.id}
//                             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                           >
//                             {field.label}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex justify-end gap-2">
//                 <Button variant="outline" onClick={() => setActiveTab("existing")}>
//                   Cancel
//                 </Button>
//                 <Button onClick={handleCreateMetric}>
//                   <Save className="mr-2 h-4 w-4" />
//                   Create Metric
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

