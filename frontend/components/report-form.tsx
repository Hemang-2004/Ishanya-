"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, Save, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  studentName: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  term: z.string(),
  educatorName: z.string().min(2, {
    message: "Educator name must be at least 2 characters.",
  }),
  reviewPeriodStart: z.date(),
  reviewPeriodEnd: z.date(),

  // General Observations
  attendance: z.string(),
  totalWorkingDays: z.string(),
  punctuality: z.string(),
  preparedness: z.string(),
  behavioralIssues: z.string(),
  assistanceRequired: z.string(),
  parentalSupport: z.string(),

  // Communication Skills
  followingInstructions: z.number(),
  politeWords: z.number(),
  askQuestions: z.number(),
  conversation: z.number(),
  describing: z.number(),
  commenting: z.number(),
  emotionalCommunication: z.number(),
  sentenceFormation: z.number(),
  communicationNotes: z.string(),

  // Cognition Skills
  prediction: z.number(),
  logicalSequencing: z.number(),
  problemSolving: z.number(),
  causeEffect: z.number(),
  decisionMaking: z.number(),
  oddOneOut: z.number(),
  cognitionNotes: z.string(),

  // Academic Skills
  englishNotes: z.string(),
  evsNotes: z.string(),
  mathNotes: z.string(),

  // Functional Skills
  copyingLines: z.number(),
  pasting: z.number(),
  folding: z.number(),
  cutting: z.number(),
  kitchenUtensils: z.number(),
  ingredients: z.number(),
  pouring: z.number(),
  scooping: z.number(),
  personalHygiene: z.number(),
  foldingClothes: z.number(),
  fillingWater: z.number(),
  packingBag: z.number(),
  wiping: z.number(),
  groupActivities: z.number(),
  functionalSkillsNotes: z.string(),

  // Extra Curricular
  extraCurricular: z.string(),

  // Strengths
  strengths: z.string(),

  // Learning Environment
  learningEnvironment: z.string(),
})

export default function ReportForm({ studentId, existingReport = null }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: existingReport || {
      studentName: "",
      term: "",
      educatorName: "",
      reviewPeriodStart: new Date(),
      reviewPeriodEnd: new Date(),
      attendance: "",
      totalWorkingDays: "64",
      punctuality: "",
      preparedness: "",
      behavioralIssues: "",
      assistanceRequired: "",
      parentalSupport: "",
      followingInstructions: 3,
      politeWords: 3,
      askQuestions: 3,
      conversation: 3,
      describing: 3,
      commenting: 3,
      emotionalCommunication: 3,
      sentenceFormation: 3,
      communicationNotes: "",
      prediction: 3,
      logicalSequencing: 3,
      problemSolving: 3,
      causeEffect: 3,
      decisionMaking: 3,
      oddOneOut: 3,
      cognitionNotes: "",
      englishNotes: "",
      evsNotes: "",
      mathNotes: "",
      copyingLines: 3,
      pasting: 3,
      folding: 3,
      cutting: 3,
      kitchenUtensils: 3,
      ingredients: 3,
      pouring: 3,
      scooping: 3,
      personalHygiene: 3,
      foldingClothes: 3,
      fillingWater: 3,
      packingBag: 3,
      wiping: 3,
      groupActivities: 3,
      functionalSkillsNotes: "",
      extraCurricular: "",
      strengths: "",
      learningEnvironment: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // In a real application, this would be an API call to save the report
      console.log(values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: isDraft ? "Draft saved successfully" : "Report submitted successfully",
        description: isDraft
          ? "The draft has been saved. You can continue editing later."
          : "The student assessment report has been submitted.",
      })

      // Redirect to the view page
      router.push(`/dashboard/teacher/reports/view/${studentId || "1"}`)
    } catch (error) {
      toast({
        title: "Error saving report",
        description: "There was an error saving the report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = () => {
    setIsDraft(true)
    form.handleSubmit(onSubmit)()
  }

  const handleDownloadDraft = () => {
    toast({
      title: "Draft downloaded",
      description: "The draft report has been downloaded as a PDF.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Student Assessment Report</h2>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleDownloadDraft}>
              <Download className="mr-2 h-4 w-4" />
              Download Draft
            </Button>
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter student name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Term 1</SelectItem>
                        <SelectItem value="2">Term 2</SelectItem>
                        <SelectItem value="3">Term 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="educatorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Educator's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter educator's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="reviewPeriodStart"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Review Period Start</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reviewPeriodEnd"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Review Period End</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="cognition">Cognition</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="functional">Functional Skills</TabsTrigger>
            <TabsTrigger value="additional">Additional Info</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>General Observations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="attendance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attendance</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input placeholder="e.g., 55" className="w-20" {...field} />
                            </FormControl>
                            <span>out of</span>
                            <FormField
                              control={form.control}
                              name="totalWorkingDays"
                              render={({ field }) => (
                                <FormControl>
                                  <Input placeholder="e.g., 64" className="w-20" {...field} />
                                </FormControl>
                              )}
                            />
                            <span>working days</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="punctuality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Punctuality and Regularity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Is on time and regular" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="preparedness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preparedness for the Sessions</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Yes. Is prepared for sessions" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="behavioralIssues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Behavioral Issues and Modifications</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe any behavioral issues and modifications done"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assistanceRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assistance Required</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Minimal verbal assistance required" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parentalSupport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parental Support at Home</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., The home environment is supportive" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Communication Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="communicationNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Communication Overview</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide an overview of the student's communication skills"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="followingInstructions"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Following 2/3-step Instructions</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="politeWords"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Using Polite Words</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="askQuestions"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Ask "WH" Questions</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="conversation"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Initiation and Maintenance of Conversation</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="describing"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Describing and Talking About Events/Objects</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="commenting"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Commenting on Objects or Events</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emotionalCommunication"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Using Words to Communicate Emotions</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sentenceFormation"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Making Simple Sentences</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cognition" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Cognition Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="cognitionNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cognition Overview</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide an overview of the student's cognitive skills"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="prediction"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Prediction</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logicalSequencing"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Logical Sequencing</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="problemSolving"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Problem-Solving</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="causeEffect"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Cause & Effect</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="decisionMaking"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Decision Making</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="oddOneOut"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel>Odd One Out + Reasoning</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={[value]}
                              min={1}
                              max={5}
                              step={0.5}
                              onValueChange={(vals) => onChange(vals[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>1</span>
                              <span>2</span>
                              <span>3</span>
                              <span>4</span>
                              <span>5</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-center">Score: {value}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academics" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Academic Skills - OBE Level A</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="englishNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English - Reading & Writing</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the student's English reading and writing abilities"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="evsNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Environmental Studies (EVS)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the student's understanding of EVS concepts"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mathNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numeracy/Mathematics</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the student's mathematical abilities"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="functional" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Functional Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="functionalSkillsNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Functional Skills Overview</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide an overview of the student's functional skills"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Art and Craft Skills</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="copyingLines"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Copying simple lines, drawings and shapes</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="pasting"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Pasting</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="folding"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Folding (origami papers)</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cutting"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Cutting with scissors on the line</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Cooking without fire Skills</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="kitchenUtensils"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Knowing names of various utensils in the kitchen</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ingredients"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Knowing names of various ingredients</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="pouring"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Pouring</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="scooping"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Scooping</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="font-medium mb-4">Life Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="personalHygiene"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Personal hygiene</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="foldingClothes"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Folding clothes</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fillingWater"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Filling water bottles</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="packingBag"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Packing your bag</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="wiping"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Wiping</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="groupActivities"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel>Group activities (turn taking, collaborative play)</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  value={[value]}
                                  min={1}
                                  max={5}
                                  step={0.5}
                                  onValueChange={(vals) => onChange(vals[0])}
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>1</span>
                                  <span>2</span>
                                  <span>3</span>
                                  <span>4</span>
                                  <span>5</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription className="text-center">Score: {value}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="additional" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="extraCurricular"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extracurricular Activities</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the student's participation in extracurricular activities"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="strengths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Strengths and Current Interests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the student's strengths and current interests observed in school"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="learningEnvironment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>The Optimal Learning Environment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the optimal learning environment for the student"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

