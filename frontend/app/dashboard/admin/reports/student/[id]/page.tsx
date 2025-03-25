"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Mock report data - in a real app, this would come from your API
const mockReportData = {
  id: "1",
  studentName: "Arjun Patel",
  term: "2",
  educatorName: "Priya Sharma",
  reviewPeriod: "September to December 2024",

  // General observations
  attendance: "55",
  totalWorkingDays: "64",
  punctuality: "Is on time and regular",
  preparedness: "Yes. Is prepared for sessions",
  behavioralIssues:
    'Student had been dysregulated since the start of the term. Student in the beginning of the term had a habit of peeling the wall and eating it. Verbal reminders like "no wall", "no eating wall" or "spit" were helpful but did not stop the behavior. It was noticed that it was only done to the walls of classroom 1 so we locked the classroom when not in use and confined Student\'s activity and academic hours to classroom 2 and activity hall. The behavior completely reduced over the following weeks and currently it is absent.\nCurrently Student\'s sitting tolerance has improved significantly since last term. First-then strategy which was used before is continued and it still seems to be very effective. Example - "If let\'s complete the worksheet then break time/then trampoline." He is able to be more flexible in his schedule and is able to sit multiple times during the hours to work on academics which wasn\'t present before.\nStudent\'s need for Ipad to eat lunch has been faded off by telling him that "it is out of charge" or "it\'s not working". He now eats independently without watching any media.\nStudent had instances of pooping in the classroom. We noticed the episodes happened after eating lunch. We would verbally prompt him to go to the washroom when we noticed that he was experiencing discomfort (crossing his leg and touching his privates). We realized that the washroom being dark or the toilet seat being misaligned or his inability to clean himself may be the issue. His parents are assisting him to go to the washroom after every lunch break and helping him clean. He is currently able to verbalize his washroom needs, for example "i want washroom" or "washroom".\nStudent\'s AVAZ session has been on pause after he wasn\'t cooperative during his AVAZ classes on Thursday and stopped engaging in school as well. This may have been because Student used to come around 11 am to school after AVAZ classes and would be tired and dysregulated. He used to say "I am so tired" and lay down to sleep. If he was very overwhelmed he would try to bite himself or others. After it was discontinued Student seemed to be more at ease and was able to focus more on academic and non academic activities.',
  assistance: "Minimal verbal assistance required",
  parentalSupport: "The home environment is supportive",

  // Communication skills
  followingInstructions: 5,
  politeWords: 3.5,
  askingQuestions: 3,
  conversation: 3,
  describing: 4,
  commenting: 3,
  emotionalCommunication: 3.5,
  sentenceFormation: 4.5,
  communicationNotes:
    "Student is able to follow 3-step instructions (Bring the chair, open your math textbook and write today's date) with some repetition if he is distracted. He is able to use polite words such as 'please', 'thank you', 'sorry', etc when he is prompted verbally. For example - \"could you please unlock the door\". He is able to answer WH questions with minimal verbal prompts. He is able to ask questions such as \"How are you\", \"What are you eating?\" with multiple verbal prompts. He is able to form grammatically correct sentences with minimal verbal prompts such as \"I want to spin/jump\", \"can i please go out\". He requires multiple verbal prompts to greet, initiate and maintain a conversation with his peers and educators. He is able to verbally describe events that happened in his life such as sports day, karnataka rajyotsava, independence day etc with repeated verbal prompts. He is also able to comment on experiences using words like 'fun', 'i liked it', \"i want more\", etc. Student is able to label emotions such as 'happy', 'upset', 'sad' etc. He is able to rationalize and reason out emotional experiences with verbal prompts, For example: I am upset because..., and Student would answer \"pain\".\nSince Student had been facing some issues with emotional regulation from the beginning of the term the use of AVAZ has been on pause as he gets agitated when we try to use it with it. So during academics AVAZ was kept aside while we worked so that we got used to having it in his presence. Recently he has been using it rarely to communicate what he had for breakfast and to greet the educators. He has also been observing other children's AVAZ sessions passively to sensitize and ease him into the use of AVAZ again.",

  // Cognition skills
  prediction: 4.5,
  logicalSequencing: 4.5,
  problemSolving: 4,
  causeEffect: 4.5,
  decisionMaking: 4.5,
  oddOneOut: 4.5,
  cognitionNotes:
    'Student has great interest in cognitive activities and enthusiastically participates in it. Typical everyday problems like "what should one do if the phone runs out of battery, what should we do if it\'s raining outside, etc." can be resolved by him independently. Student is able to comprehend and forecast the results of a variety of acts on his own, including "what will happen if it\'s cloudy?" and "what will happen if we water plants?" Student can choose between materials and express his preferences for activities on his own. For instance, "I want to hug/spin," or "I want to go to the OT room." With phrases like "I want a blanket" and "I want to eat snacks," he may express his preferences for both food and clothing.\nStudent can effectively complete a variety of problem-solving tasks, including word searches, matching games, building with blocks, picture puzzles, and games that require sorting shapes and colours. Student can independently solve the ABAB, ABCABC, AABB, and AABBCC sequencing problems. Student can independently identify the odd one out of a collection of comparable traits, such as the odd one out of cities, nations, plants, vegetables etc., and can use reasoning to determine how they are all similar or different.',

  // Academic skills
  englishReading:
    "Student can read comprehension paragraphs, poems, and short stories on his own. When he can't pronounce a lengthier word, he asks for help verbally. With no verbal prompting or repetition, he is able to respond to the textbook questions pertaining to the stories and chapters.",
  englishWriting:
    'With little verbal cues, he can construct basic sentences using adjectives like huge, beautiful, and tall, as well as action terms like running, dancing, and cooking. With little verbal guidance, he can respond to simple grammar queries like verbs, adjectives, prepositions, tenses, etc. Student needs some help with verbal prompts that ask him to speak/write more than two sentences on a particular subject, like "Describe your trip to Mysore," "Write about your favourite holiday," etc.',
  evs: "Student can read and comprehend the chapters on his own. With very little verbal prompts, he has answers to the textbook questions (Fill in the blanks, choose the right options, match the following, etc) related to the chapters. He gives his educator a verbal cue (by repeating the question and pointing) to assist him if he is confused by the answer. He is aware of concepts like sources of water, different types of senses, concept of family and relationship within them, different types of meals we eat, etc and is able to produce answers related to the same.",
  math: "Student can perform addition and subtraction using two and three digits, greater than, less than, place values up to hundredth value, and ascending and descending order with minimal verbal prompts. When it comes to some challenging concepts, like word problems, he needs little verbal cues and some repetitions. He can express his confusion or desire for assistance by verbally repeating the question or by gesturing (pointing to the book, gazing at the teacher). He can understand quantities like millimetres, centimetres, meters, etc., and basic shapes.",

  // Functional skills
  copyingDrawing: 4.5,
  pasting: 4.5,
  folding: 3.5,
  cutting: 3.5,
  kitchenUtensils: 4.5,
  ingredients: 4.5,
  pouring: 4.5,
  scooping: 4.5,
  personalHygiene: 3,
  foldingClothes: 4.5,
  fillingWater: 4.5,
  packing: 4.5,
  wiping: 4.5,
  groupActivities: 4,
  functionalNotes:
    "Student can independently draw, paste, and copy simple lines as well as a range of shapes, such as squares, circles, and triangles. He was able to follow the instructions for making the origami (dog and home) by himself, with just a few verbal prompts to help him focus. Student requires both verbal and physical instructions to cut with scissors in a variety of shapes and straight, zigzag lines. Student is acquainted with every kitchen tool and ingredient. He is independent in scooping, mixing, and pouring ingredients. After several verbal cues, Student takes responsibility for his personal hygiene and washes his hands after meals, wiping his nose and covering his mouth while coughing.\nHe is able to fold his clothes, fill his water bottle, and pack his belongings by himself. He can wait his turn, actively engages in group activities, and understands the rules of the games (e.g., hopscotch, obstacle race, red light green light, and floor is lava). He likes to play with blocks, pass the parcel with other kids, and use the treadmill.",

  // Extracurricular
  extracurricular:
    "Student took part in Independence Day by dressing up as a freedom fighter, performing a group song, and giving a speech introducing the role. He likes to engage in sports such as running, jumping, backward walking and spinning with his friends. He engaged in cultural events such as Onam and Diwali celebration where he painted diyas and decorated the class with Pookalam.",

  // Strengths
  interests:
    "Student likes doing cognitive games like word search, odd one out, and liquid sorting as well as hands-on activities like playing with blocks and puzzles. He engages in sensory activities like kinetic sand, trampolines, and treadmills. He is totally independent and enjoys playing computer-based activities including word games, picture puzzles, and quizzes. He always looks forward to coding since he is so enthusiastic about it.",

  // Learning environment
  learningEnvironment:
    "Multimodal materials (visual and auditory) including written notes, verbal directions, flowcharts, and YouTube videos help Student learn more effectively. In both academic and non-academic contexts, he effectively absorbs verbal instructions and modelling. Multiple repetition and question formats, such as fill in the gaps, match the following, and multiple choice, help him understand and retain information better.",

  // Historical data for progress tracking
  historicalData: {
    terms: ["Term 1", "Term 2"],
    communication: [
      {
        followingInstructions: 4,
        politeWords: 3,
        askingQuestions: 2.5,
        conversation: 2.5,
        describing: 3.5,
        commenting: 2.5,
        emotionalCommunication: 3,
        sentenceFormation: 4,
      },
      {
        followingInstructions: 5,
        politeWords: 3.5,
        askingQuestions: 3,
        conversation: 3,
        describing: 4,
        commenting: 3,
        emotionalCommunication: 3.5,
        sentenceFormation: 4.5,
      },
    ],
    cognition: [
      {
        prediction: 4,
        logicalSequencing: 4,
        problemSolving: 3.5,
        causeEffect: 4,
        decisionMaking: 4,
        oddOneOut: 4,
      },
      {
        prediction: 4.5,
        logicalSequencing: 4.5,
        problemSolving: 4,
        causeEffect: 4.5,
        decisionMaking: 4.5,
        oddOneOut: 4.5,
      },
    ],
    functional: [
      {
        copyingDrawing: 4,
        pasting: 4,
        folding: 3,
        cutting: 3,
        kitchenUtensils: 4,
        ingredients: 4,
        pouring: 4,
        scooping: 4,
        personalHygiene: 2.5,
        foldingClothes: 4,
        fillingWater: 4,
        packing: 4,
        wiping: 4,
        groupActivities: 3.5,
      },
      {
        copyingDrawing: 4.5,
        pasting: 4.5,
        folding: 3.5,
        cutting: 3.5,
        kitchenUtensils: 4.5,
        ingredients: 4.5,
        pouring: 4.5,
        scooping: 4.5,
        personalHygiene: 3,
        foldingClothes: 4.5,
        fillingWater: 4.5,
        packing: 4.5,
        wiping: 4.5,
        groupActivities: 4,
      },
    ],
    attendance: [
      {
        present: 50,
        total: 64,
        percentage: 78.1,
      },
      {
        present: 55,
        total: 64,
        percentage: 85.9,
      },
    ],
  },
}

// Prepare data for radar chart
const prepareRadarData = (report) => {
  return [
    { subject: "Following Instructions", A: report.followingInstructions, fullMark: 5 },
    { subject: "Polite Words", A: report.politeWords, fullMark: 5 },
    { subject: "Asking Questions", A: report.askingQuestions, fullMark: 5 },
    { subject: "Conversation", A: report.conversation, fullMark: 5 },
    { subject: "Describing", A: report.describing, fullMark: 5 },
    { subject: "Commenting", A: report.commenting, fullMark: 5 },
    { subject: "Emotional Communication", A: report.emotionalCommunication, fullMark: 5 },
    { subject: "Sentence Formation", A: report.sentenceFormation, fullMark: 5 },
  ]
}

// Prepare data for progress line chart
const prepareProgressData = (report) => {
  const terms = report.historicalData.terms
  const communicationData = report.historicalData.communication

  return terms.map((term, index) => {
    const data = communicationData[index]
    return {
      name: term,
      followingInstructions: data.followingInstructions,
      politeWords: data.politeWords,
      askingQuestions: data.askingQuestions,
      conversation: data.conversation,
      describing: data.describing,
      commenting: data.commenting,
      emotionalCommunication: data.emotionalCommunication,
      sentenceFormation: data.sentenceFormation,
    }
  })
}

// Prepare data for attendance chart
const prepareAttendanceData = (report) => {
  return report.historicalData.terms.map((term, index) => {
    const data = report.historicalData.attendance[index]
    return {
      name: term,
      present: data.present,
      absent: data.total - data.present,
      percentage: data.percentage,
    }
  })
}

export default function AdminStudentReportPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [report, setReport] = useState(mockReportData)
  const [loading, setLoading] = useState(true)
  const [radarData, setRadarData] = useState([])
  const [progressData, setProgressData] = useState([])
  const [attendanceData, setAttendanceData] = useState([])

  // In a real app, you would fetch the report data from your API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRadarData(prepareRadarData(mockReportData))
      setProgressData(prepareProgressData(mockReportData))
      setAttendanceData(prepareAttendanceData(mockReportData))
      setLoading(false)
    }, 500)
  }, [params.id])

  const handleDownload = () => {
    toast({
      title: "Report downloaded",
      description: "The assessment report has been downloaded as a PDF.",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading report...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 print:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="print:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Student Assessment Report</h2>
            <p className="text-muted-foreground">Sameti - A Pre-academic Skills Program</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrint} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload} className="print:hidden">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="text-center mb-8 print:mb-6">
        <h1 className="text-2xl font-bold mb-2">Sameti - A Pre-academic Skills Program</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
          <div className="flex justify-between">
            <span className="font-medium">Name of Student:</span>
            <span>{report.studentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Term:</span>
            <span>{report.term}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Name of Educator:</span>
            <span>{report.educatorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Period of Review:</span>
            <span>{report.reviewPeriod}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 print:block">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full print:hidden">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Report Details</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="print:block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Summary</CardTitle>
                <CardDescription>Key information about {report.studentName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="font-medium">Attendance</div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(Number.parseInt(report.attendance) / Number.parseInt(report.totalWorkingDays)) * 100}
                      className="h-2 flex-1"
                    />
                    <span className="text-sm">
                      {report.attendance}/{report.totalWorkingDays} days (
                      {((Number.parseInt(report.attendance) / Number.parseInt(report.totalWorkingDays)) * 100).toFixed(
                        1,
                      )}
                      %)
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-medium">Assistance Required</div>
                  <div>{report.assistance}</div>
                </div>

                <div className="space-y-1">
                  <div className="font-medium">Parental Support</div>
                  <div>{report.parentalSupport}</div>
                </div>

                <div className="space-y-1">
                  <div className="font-medium">Key Strengths</div>
                  <div className="line-clamp-3">{report.interests}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Assessment Overview</CardTitle>
                <CardDescription>Average scores across skill areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} />
                      <Radar name="Current Term" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Communication Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(
                    (report.followingInstructions +
                      report.politeWords +
                      report.askingQuestions +
                      report.conversation +
                      report.describing +
                      report.commenting +
                      report.emotionalCommunication +
                      report.sentenceFormation) /
                    8
                  ).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Average score out of 5</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">Highest: Following Instructions ({report.followingInstructions})</div>
                  <div className="text-sm">
                    Lowest: Asking Questions & Conversation ({Math.min(report.askingQuestions, report.conversation)})
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Cognition Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(
                    (report.prediction +
                      report.logicalSequencing +
                      report.problemSolving +
                      report.causeEffect +
                      report.decisionMaking +
                      report.oddOneOut) /
                    6
                  ).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Average score out of 5</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    Highest: Multiple areas (
                    {Math.max(
                      report.prediction,
                      report.logicalSequencing,
                      report.causeEffect,
                      report.decisionMaking,
                      report.oddOneOut,
                    )}
                    )
                  </div>
                  <div className="text-sm">Lowest: Problem-Solving ({report.problemSolving})</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Functional Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(
                    (report.copyingDrawing +
                      report.pasting +
                      report.folding +
                      report.cutting +
                      report.kitchenUtensils +
                      report.ingredients +
                      report.pouring +
                      report.scooping +
                      report.personalHygiene +
                      report.foldingClothes +
                      report.fillingWater +
                      report.packing +
                      report.wiping +
                      report.groupActivities) /
                    14
                  ).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Average score out of 5</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">Highest: Multiple areas (4.5)</div>
                  <div className="text-sm">Lowest: Personal Hygiene ({report.personalHygiene})</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Report Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Observations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="font-medium">Attendance</div>
                  <div>
                    {report.attendance} out of {report.totalWorkingDays} working days
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">Punctuality and regularity</div>
                  <div>{report.punctuality}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">Preparedness for the sessions</div>
                  <div>{report.preparedness}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">Assistance required</div>
                  <div>{report.assistance}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">Any behavioural issues and modifications done</div>
                <div className="whitespace-pre-line">{report.behavioralIssues}</div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">Parental support at home</div>
                <div>{report.parentalSupport}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="whitespace-pre-line">{report.communicationNotes}</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Following 2/3-step instructions</span>
                      <span>{report.followingInstructions}</span>
                    </div>
                    <Progress value={(report.followingInstructions / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Using polite words in various situations</span>
                      <span>{report.politeWords}</span>
                    </div>
                    <Progress value={(report.politeWords / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Ask "WH" Questions to obtain information</span>
                      <span>{report.askingQuestions}</span>
                    </div>
                    <Progress value={(report.askingQuestions / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Initiation and maintenance of conversation</span>
                      <span>{report.conversation}</span>
                    </div>
                    <Progress value={(report.conversation / 5) * 100} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Describing and talking about an event, an object, or people</span>
                      <span>{report.describing}</span>
                    </div>
                    <Progress value={(report.describing / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Commenting on objects or events</span>
                      <span>{report.commenting}</span>
                    </div>
                    <Progress value={(report.commenting / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Using appropriate words to communicate and reason their emotions
                      </span>
                      <span>{report.emotionalCommunication}</span>
                    </div>
                    <Progress value={(report.emotionalCommunication / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Making a simple sentence (subject + verb + object)</span>
                      <span>{report.sentenceFormation}</span>
                    </div>
                    <Progress value={(report.sentenceFormation / 5) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cognition Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="whitespace-pre-line">{report.cognitionNotes}</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Prediction</span>
                      <span>{report.prediction}</span>
                    </div>
                    <Progress value={(report.prediction / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Logical sequencing</span>
                      <span>{report.logicalSequencing}</span>
                    </div>
                    <Progress value={(report.logicalSequencing / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Problem-Solving</span>
                      <span>{report.problemSolving}</span>
                    </div>
                    <Progress value={(report.problemSolving / 5) * 100} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Cause & effect</span>
                      <span>{report.causeEffect}</span>
                    </div>
                    <Progress value={(report.causeEffect / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Decision making</span>
                      <span>{report.decisionMaking}</span>
                    </div>
                    <Progress value={(report.decisionMaking / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Odd One Out + Reasoning</span>
                      <span>{report.oddOneOut}</span>
                    </div>
                    <Progress value={(report.oddOneOut / 5) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="font-medium">English - Reading & Comprehension</div>
                <div>{report.englishReading}</div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">English - Writing & Grammar</div>
                <div>{report.englishWriting}</div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">Environmental Studies (EVS)</div>
                <div>{report.evs}</div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">Numeracy/Mathematics</div>
                <div>{report.math}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Strengths and Learning Environment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="font-medium">Strengths and Current Interests</div>
                <div className="whitespace-pre-line">{report.interests}</div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">The Optimal Learning Environment</div>
                <div className="whitespace-pre-line">{report.learningEnvironment}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tracking Tab */}
        <TabsContent value="progress">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Communication Skills Progress</CardTitle>
                <CardDescription>Tracking improvement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="followingInstructions"
                        name="Following Instructions"
                        stroke="#8884d8"
                      />
                      <Line type="monotone" dataKey="politeWords" name="Polite Words" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="askingQuestions" name="Asking Questions" stroke="#ffc658" />
                      <Line type="monotone" dataKey="conversation" name="Conversation" stroke="#ff8042" />
                      <Line type="monotone" dataKey="describing" name="Describing" stroke="#0088fe" />
                      <Line type="monotone" dataKey="commenting" name="Commenting" stroke="#00c49f" />
                      <Line
                        type="monotone"
                        dataKey="emotionalCommunication"
                        name="Emotional Communication"
                        stroke="#ffbb28"
                      />
                      <Line type="monotone" dataKey="sentenceFormation" name="Sentence Formation" stroke="#ff8042" />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Tracking</CardTitle>
                <CardDescription>Monitoring attendance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="present" name="Days Present" stroke="#8884d8" />
                      <Line yAxisId="left" type="monotone" dataKey="absent" name="Days Absent" stroke="#ff8042" />
                      <Line yAxisId="right" type="monotone" dataKey="percentage" name="Attendance %" stroke="#82ca9d" />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Skill Area Comparison</CardTitle>
              <CardDescription>Analyzing strengths and areas for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Communication Skills</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Average Score:</span>
                      <span className="font-medium">
                        {(
                          (report.followingInstructions +
                            report.politeWords +
                            report.askingQuestions +
                            report.conversation +
                            report.describing +
                            report.commenting +
                            report.emotionalCommunication +
                            report.sentenceFormation) /
                          8
                        ).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Strengths:</span>
                      <span className="font-medium">Following Instructions, Sentence Formation</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Areas for Improvement:</span>
                      <span className="font-medium">Asking Questions, Conversation, Commenting</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Progress from Previous Term:</span>
                      <Badge className="bg-green-500">+0.5 points</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Cognition Skills</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Average Score:</span>
                      <span className="font-medium">
                        {(
                          (report.prediction +
                            report.logicalSequencing +
                            report.problemSolving +
                            report.causeEffect +
                            report.decisionMaking +
                            report.oddOneOut) /
                          6
                        ).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Strengths:</span>
                      <span className="font-medium">Prediction, Logical Sequencing, Cause & Effect</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Areas for Improvement:</span>
                      <span className="font-medium">Problem-Solving</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Progress from Previous Term:</span>
                      <Badge className="bg-green-500">+0.5 points</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Functional Skills</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Average Score:</span>
                      <span className="font-medium">
                        {(
                          (report.copyingDrawing +
                            report.pasting +
                            report.folding +
                            report.cutting +
                            report.kitchenUtensils +
                            report.ingredients +
                            report.pouring +
                            report.scooping +
                            report.personalHygiene +
                            report.foldingClothes +
                            report.fillingWater +
                            report.packing +
                            report.wiping +
                            report.groupActivities) /
                          14
                        ).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Strengths:</span>
                      <span className="font-medium">Copying & Drawing, Kitchen Skills</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Areas for Improvement:</span>
                      <span className="font-medium">Personal Hygiene, Cutting, Folding</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Progress from Previous Term:</span>
                      <Badge className="bg-green-500">+0.4 points</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Recommendations</h3>
                  <div className="space-y-2">
                    <div className="p-4 border rounded-md">
                      <p className="font-medium">Communication Focus Areas:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Continue practicing conversation initiation with peers</li>
                        <li>Provide more opportunities to ask questions in different contexts</li>
                        <li>Encourage commenting on everyday objects and events</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-md">
                      <p className="font-medium">Cognition Focus Areas:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Introduce more complex problem-solving activities</li>
                        <li>Continue building on strengths in prediction and logical sequencing</li>
                        <li>Incorporate more real-world problem-solving scenarios</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-md">
                      <p className="font-medium">Functional Skills Focus Areas:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Develop a consistent personal hygiene routine with visual supports</li>
                        <li>Provide more practice with scissors and cutting activities</li>
                        <li>Continue origami activities to improve folding skills</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

