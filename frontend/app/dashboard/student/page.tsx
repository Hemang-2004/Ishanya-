"use client";
import ReactMarkdown from "react-markdown"
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
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
} from "recharts";

import { getUserData } from "@/utils/auth" // Import getUserData function
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Calendar, Clock, FileText, MessageSquare, Star, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  LineChart as RechartsLineChart,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

// Sample progress data for charts
const progressData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 75 },
  { month: "May", score: 78 },
  { month: "Jun", score: 82 },
]

const skillsData = [
  { subject: "Computer Basics", A: 85, fullMark: 100 },
  { subject: "Internet", A: 90, fullMark: 100 },
  { subject: "MS Office", A: 75, fullMark: 100 },
  { subject: "Email", A: 80, fullMark: 100 },
  { subject: "Online Safety", A: 70, fullMark: 100 },
]

export default function StudentDashboardPage() {
  const [user, setUser] = useState<{ userId: string; userName: string; role: string } | null>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")

  useEffect(() => {
    const storedUser = getUserData()
    if (storedUser) {
      setUser(storedUser)
      console.log("User ID here:", storedUser.userId) // Safely print userId
    } else {
      console.log("No user data found")
    }
  }, [])
  


// Mock report data - in a real app, this would come from your API
const mockReportData = {
  AIInsights: "",
  TPS: 2,
  EducatorID: "1",
  studentName: "Arjun Patel",
  Term: "2",
  educatorName: "Priya Sharma",
  reviewPeriod: "September to December 2024",

  // General observations
  Attendance: "55",
  TotalWorkingDays: "64",
  Punctuality: "Is on time and regular",
  Preparedness: "Yes. Is prepared for sessions",
  BehavioralIssues:
    'Student had been dysregulated since the start of the term. Student in the beginning of the term had a habit of peeling the wall and eating it. Verbal reminders like "no wall", "no eating wall" or "spit" were helpful but did not stop the behavior. It was noticed that it was only done to the walls of classroom 1 so we locked the classroom when not in use and confined Student\'s activity and academic hours to classroom 2 and activity hall. The behavior completely reduced over the following weeks and currently it is absent.\nCurrently Student\'s sitting tolerance has improved significantly since last term. First-then strategy which was used before is continued and it still seems to be very effective. Example - "If let\'s complete the worksheet then break time/then trampoline." He is able to be more flexible in his schedule and is able to sit multiple times during the hours to work on academics which wasn\'t present before.\nStudent\'s need for Ipad to eat lunch has been faded off by telling him that "it is out of charge" or "it\'s not working". He now eats independently without watching any media.\nStudent had instances of pooping in the classroom. We noticed the episodes happened after eating lunch. We would verbally prompt him to go to the washroom when we noticed that he was experiencing discomfort (crossing his leg and touching his privates). We realized that the washroom being dark or the toilet seat being misaligned or his inability to clean himself may be the issue. His parents are assisting him to go to the washroom after every lunch break and helping him clean. He is currently able to verbalize his washroom needs, for example "i want washroom" or "washroom".\nStudent\'s AVAZ session has been on pause after he wasn\'t cooperative during his AVAZ classes on Thursday and stopped engaging in school as well. This may have been because Student used to come around 11 am to school after AVAZ classes and would be tired and dysregulated. He used to say "I am so tired" and lay down to sleep. If he was very overwhelmed he would try to bite himself or others. After it was discontinued Student seemed to be more at ease and was able to focus more on academic and non academic activities.',
  Assistance: "Minimal verbal assistance required",
  ParentalSupport: "The home environment is supportive",

  // Communication skills
  FollowingInstructions: 5,
  PoliteWords: 3.5,
  AskingQuestions: 3,
  Conversation: 3,
  Describing: 4,
  Commenting: 3,
  EmotionalCommunication: 3.5,
  SentenceFormation: 4.5,
  communicationNotes:
    "Student is able to follow 3-step instructions (Bring the chair, open your math textbook and write today's date) with some repetition if he is distracted. He is able to use polite words such as 'please', 'thank you', 'sorry', etc when he is prompted verbally. For example - \"could you please unlock the door\". He is able to answer WH questions with minimal verbal prompts. He is able to ask questions such as \"How are you\", \"What are you eating?\" with multiple verbal prompts. He is able to form grammatically correct sentences with minimal verbal prompts such as \"I want to spin/jump\", \"can i please go out\". He requires multiple verbal prompts to greet, initiate and maintain a conversation with his peers and educators. He is able to verbally describe events that happened in his life such as sports day, karnataka rajyotsava, independence day etc with repeated verbal prompts. He is also able to comment on experiences using words like 'fun', 'i liked it', \"i want more\", etc. Student is able to label emotions such as 'happy', 'upset', 'sad' etc. He is able to rationalize and reason out emotional experiences with verbal prompts, For example: I am upset because..., and Student would answer \"pain\".\nSince Student had been facing some issues with emotional regulation from the beginning of the term the use of AVAZ has been on pause as he gets agitated when we try to use it with it. So during academics AVAZ was kept aside while we worked so that we got used to having it in his presence. Recently he has been using it rarely to communicate what he had for breakfast and to greet the educators. He has also been observing other children's AVAZ sessions passively to sensitize and ease him into the use of AVAZ again.",

  // Cognition skills
  Prediction: 4.5,
  LogicalSequencing: 4.5,
  ProblemSolving: 4,
  CauseEffect: 4.5,
  DecisionMaking: 4.5,
  OddOneOut: 4.5,
  cognitionNotes:
    'Student has great interest in cognitive activities and enthusiastically participates in it. Typical everyday problems like "what should one do if the phone runs out of battery, what should we do if it\'s raining outside, etc." can be resolved by him independently. Student is able to comprehend and forecast the results of a variety of acts on his own, including "what will happen if it\'s cloudy?" and "what will happen if we water plants?" Student can choose between materials and express his preferences for activities on his own. For instance, "I want to hug/spin," or "I want to go to the OT room." With phrases like "I want a blanket" and "I want to eat snacks," he may express his preferences for both food and clothing.\nStudent can effectively complete a variety of problem-solving tasks, including word searches, matching games, building with blocks, picture puzzles, and games that require sorting shapes and colours. Student can independently solve the ABAB, ABCABC, AABB, and AABBCC sequencing problems. Student can independently identify the odd one out of a collection of comparable traits, such as the odd one out of cities, nations, plants, vegetables etc., and can use reasoning to determine how they are all similar or different.',

  // Academic skills
  EnglishReading:
    "Student can read comprehension paragraphs, poems, and short stories on his own. When he can't pronounce a lengthier word, he asks for help verbally. With no verbal prompting or repetition, he is able to respond to the textbook questions pertaining to the stories and chapters.",
  EnglishWriting:
    'With little verbal cues, he can construct basic sentences using adjectives like huge, beautiful, and tall, as well as action terms like running, dancing, and cooking. With little verbal guidance, he can respond to simple grammar queries like verbs, adjectives, prepositions, tenses, etc. Student needs some help with verbal prompts that ask him to speak/write more than two sentences on a particular subject, like "Describe your trip to Mysore," "Write about your favourite holiday," etc.',
  EVS: "Student can read and comprehend the chapters on his own. With very little verbal prompts, he has answers to the textbook questions (Fill in the blanks, choose the right options, match the following, etc) related to the chapters. He gives his educator a verbal cue (by repeating the question and pointing) to assist him if he is confused by the answer. He is aware of concepts like sources of water, different types of senses, concept of family and relationship within them, different types of meals we eat, etc and is able to produce answers related to the same.",
  Math: "Student can perform addition and subtraction using two and three digits, greater than, less than, place values up to hundredth value, and ascending and descending order with minimal verbal prompts. When it comes to some challenging concepts, like word problems, he needs little verbal cues and some repetitions. He can express his confusion or desire for assistance by verbally repeating the question or by gesturing (pointing to the book, gazing at the teacher). He can understand quantities like millimetres, centimetres, meters, etc., and basic shapes.",

  // Functional skills
  CopyingDrawing: 4.5,
  Pasting: 4.5,
  Folding: 3.5,
  Cutting: 3.5,
  KitchenUtensils: 4.5,
  Ingredients: 4.5,
  Pouring: 4.5,
  Scooping: 4.5,
  PersonalHygiene: 3,
  FoldingClothes: 4.5,
  FillingWater: 4.5,
  Packing: 4.5,
  Wiping: 4.5,
  GroupActivities: 4,
  functionalNotes:
    "Student can independently draw, paste, and copy simple lines as well as a range of shapes, such as squares, circles, and triangles. He was able to follow the instructions for making the origami (dog and home) by himself, with just a few verbal prompts to help him focus. Student requires both verbal and physical instructions to cut with scissors in a variety of shapes and straight, zigzag lines. Student is acquainted with every kitchen tool and ingredient. He is independent in scooping, mixing, and pouring ingredients. After several verbal cues, Student takes responsibility for his personal hygiene and washes his hands after meals, wiping his nose and covering his mouth while coughing.\nHe is able to fold his clothes, fill his water bottle, and pack his belongings by himself. He can wait his turn, actively engages in group activities, and understands the rules of the games (e.g., hopscotch, obstacle race, red light green light, and floor is lava). He likes to play with blocks, pass the parcel with other kids, and use the treadmill.",

  // Extracurricular
  Extracurricular:
    "Student took part in Independence Day by dressing up as a freedom fighter, performing a group song, and giving a speech introducing the role. He likes to engage in sports such as running, jumping, backward walking and spinning with his friends. He engaged in cultural events such as Onam and Diwali celebration where he painted diyas and decorated the class with Pookalam.",

  // Strengths
  Strengths:
    "Student likes doing cognitive games like word search, odd one out, and liquid sorting as well as hands-on activities like playing with blocks and puzzles. He engages in sensory activities like kinetic sand, trampolines, and treadmills. He is totally independent and enjoys playing computer-based activities including word games, picture puzzles, and quizzes. He always looks forward to coding since he is so enthusiastic about it.",

  // Learning environment
  LearningEnvironment:
    "Multimodal materials (visual and auditory) including written notes, verbal directions, flowcharts, and YouTube videos help Student learn more effectively. In both academic and non-academic contexts, he effectively absorbs verbal instructions and modelling. Multiple repetition and question formats, such as fill in the gaps, match the following, and multiple choice, help him understand and retain information better.",

  // Historical data for progress tracking
  historicalData: {
    terms: ["Term 1", "Term 2"],
    communication: [
      {
        FollowingInstructions: 4,
        PoliteWords: 3,
        AskingQuestions: 2.5,
        Conversation: 2.5,
        Describing: 3.5,
        Commenting: 2.5,
        EmotionalCommunication: 3,
        SentenceFormation: 4,
      },
      {
        FollowingInstructions: 5,
        PoliteWords: 3.5,
        AskingQuestions: 3,
        Conversation: 3,
        Describing: 4,
        Commenting: 3,
        EmotionalCommunication: 3.5,
        SentenceFormation: 4.5,
      },
    ],
    cognition: [
      {
        Prediction: 4,
        LogicalSequencing: 4,
        ProblemSolving: 3.5,
        CauseEffect: 4,
        DecisionMaking: 4,
        OddOneOut: 4,
      },
      {
        Prediction: 4.5,
        LogicalSequencing: 4.5,
        ProblemSolving: 4,
        CauseEffect: 4.5,
        DecisionMaking: 4.5,
        OddOneOut: 4.5,
      },
    ],
    functional: [
      {
        CopyingDrawing: 4,
        Pasting: 4,
        Folding: 3,
        Cutting: 3,
        KitchenUtensils: 4,
        Ingredients: 4,
        Pouring: 4,
        Scooping: 4,
        PersonalHygiene: 2.5,
        FoldingClothes: 4,
        FillingWater: 4,
        Packing: 4,
        Wiping: 4,
        GroupActivities: 3.5,
      },
      {
        CopyingDrawing: 4.5,
        Pasting: 4.5,
        Folding: 3.5,
        Cutting: 3.5,
        KitchenUtensils: 4.5,
        Ingredients: 4.5,
        Pouring: 4.5,
        Scooping: 4.5,
        PersonalHygiene: 3,
        FoldingClothes: 4.5,
        FillingWater: 4.5,
        Packing: 4.5,
        Wiping: 4.5,
        GroupActivities: 4,
      },
    ],
    Attendance: [
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
};

// Prepare data for radar chart
const prepareRadarData = (report: {
  FollowingInstructions: any;
  PoliteWords: any;
  AskingQuestions: any;
  Conversation: any;
  Describing: any;
  Commenting: any;
  EmotionalCommunication: any;
  SentenceFormation: any;
}) => {
  return [
    {
      subject: "Following Instructions",
      A: report.FollowingInstructions,
      fullMark: 5,
    },
    { subject: "Polite Words", A: report.PoliteWords, fullMark: 5 },
    { subject: "Asking Questions", A: report.AskingQuestions, fullMark: 5 },
    { subject: "Conversation", A: report.Conversation, fullMark: 5 },
    { subject: "Describing", A: report.Describing, fullMark: 5 },
    { subject: "Commenting", A: report.Commenting, fullMark: 5 },
    {
      subject: "Emotional Communication",
      A: report.EmotionalCommunication,
      fullMark: 5,
    },
    { subject: "Sentence Formation", A: report.SentenceFormation, fullMark: 5 },
  ];
};

// Prepare data for progress line chart
const prepareProgressData = (report: {
  historicalData: { terms: any; communication: any };
}) => {
  const terms = report.historicalData.terms;
  const communicationData = report.historicalData.communication;

  return terms.map((Term: any, index: string | number) => {
    const data = communicationData[index];
    return {
      name: Term,
      FollowingInstructions: data.FollowingInstructions,
      PoliteWords: data.PoliteWords,
      AskingQuestions: data.AskingQuestions,
      Conversation: data.Conversation,
      Describing: data.Describing,
      Commenting: data.Commenting,
      EmotionalCommunication: data.EmotionalCommunication,
      SentenceFormation: data.SentenceFormation,
    };
  });
};

// Prepare data for Attendance chart
const prepareAttendanceData = (report: {
  historicalData: { terms: any[]; Attendance: { [x: string]: any } };
}) => {
  return report.historicalData.terms.map(
    (Term: any, index: string | number) => {
      const data = report.historicalData.Attendance[index];
      return {
        name: Term,
        present: data.present,
        absent: data.total - data.present,
        percentage: data.percentage,
      };
    }
  );
};

// export default function AdminStudentReportPage() {
  type DataType = { subject: string; A: any; fullMark: number };
  type AttendanceType = {
    name: any;
    present: any;
    absent: number;
    percentage: any;
  };
  const router = useRouter();
  // const params = useParams()
  const { toast } = useToast();
  const [reportData, setReportData] = useState(mockReportData);
  const [report, setReport] = useState(reportData);
  const [loading, setLoading] = useState(true);
  const [radarData, setRadarData] = useState<DataType[]>([]);
  const [progressData, setProgressData] = useState([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceType[]>([]);
  const [TotalWorkingDays, setTotalWorkingDays] = useState(63);
  const params = useParams(); // Get dynamic route params
  const studentid = user?.userId; // Extract parameters from URL
  console.log(studentid);
  const [educatorId, setEducatorId] = useState("");
  const [programName, setProgramName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // In a real app, you would fetch the report data from your API
  // useEffect(() => {
  //   // Simulate API call
  //   setTimeout(() => {
  //     setRadarData(prepareRadarData(reportData))
  //     setProgressData(prepareProgressData(reportData))
  //     setAttendanceData(prepareAttendanceData(reportData))
  //     setLoading(false)
  //   }, 500)
  // }, [params.id])

  const handleDownload = () => {
    toast({
      title: "Report downloaded",
      description: "The assessment report has been downloaded as a PDF.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const flattenAndCapitalizeKeys = (obj: any, parentKey = ""): any => {
    let result: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = key.charAt(0).toUpperCase() + key.slice(1);

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(result, flattenAndCapitalizeKeys(value, newKey));
      } else {
        result[newKey] = value;
      }
    }

    return result;
  };

  useEffect(() => {
    const fetchFeedbackReport = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/admins/get-feedback-report/${studentid}/1`
        );
        console.log(response);
        if (!response.ok) {
          // const response = await fetch(
          //   `http://127.0.0.1:5000/admins/get-feedback-report/${studentid}/1`
          // );

          // if (!response.ok) {
          throw new Error("Failed to fetch feedback report");
          // }
        }
        console.log("helloooo")
        const data = await response.json();
        console.log(data);
        setReportData(flattenAndCapitalizeKeys(data));
        setReport(flattenAndCapitalizeKeys(data));

        setRadarData(prepareRadarData(flattenAndCapitalizeKeys(data)));
        setProgressData(prepareProgressData(flattenAndCapitalizeKeys(data)));
        setAttendanceData(
          prepareAttendanceData(flattenAndCapitalizeKeys(data))
        );
      } catch (err) {
        
        // setError(err.message)
      } finally {
        setLoading(false);
      }
    };

    const fetchProgramName = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/students/${studentid}/program`);
        if (!response.ok) {
          throw new Error("Failed to fetch program name");
        }
        const data = await response.json();
        setProgramName(data.ProgramName);
      } catch (err) {
        // setError(err.message);
      }
    };

    console.log(studentid);
    if (studentid) {
      fetchFeedbackReport();
      fetchProgramName();
    }
  }, [studentid]);

  console.log(programName);
  useEffect(() => {
    if (report && report.EducatorID) {
      setEducatorId(report.EducatorID);
    }
  }, [report]);

  console.log(reportData);

  const [educatorName, setEducatorName] = useState("");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    // setEducatorId(report.EducatorID);
    // Fetch Educator Name
    fetch(`http://127.0.0.1:5000/educators/${educatorId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.name) setEducatorName(data.name);
      })
      .catch((error) => console.error("Error fetching educator:", error));

    // Fetch Student Name
    fetch(`http://127.0.0.1:5000/students/${studentid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.name) setStudentName(data.name);
      })
      .catch((error) => console.error("Error fetching student:", error));
  }, [educatorId, studentid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading report...</p>
        </div>
      </div>
    );
  }
  const getMinMax = (fields: Record<string, number>) => {
    let entries = Object.entries(fields) as [string, number][];
    
    let minValue = Math.min(...entries.map(([_, value]) => value));
    let maxValue = Math.max(...entries.map(([_, value]) => value));
  
    let minFieldsCount = entries.filter(([_, value]) => value === minValue).length;
    let maxFieldsCount = entries.filter(([_, value]) => value === maxValue).length;
  
    return {
      minField: minFieldsCount > 1 ? "Multiple areas" : 
                entries.find(([_, value]) => value === minValue)?.[0].replace(/([A-Z])/g, " $1").trim(),
      minValue,
      maxField: maxFieldsCount > 1 ? "Multiple areas" : 
                entries.find(([_, value]) => value === maxValue)?.[0].replace(/([A-Z])/g, " $1").trim(),
      maxValue,
    };
  };
  

  return (




    <div className="space-y-6 print:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome, {user ? user.userName : "Student"}!</h2>
          <p className="text-muted-foreground">Track your progress and stay connected with your teachers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Teacher
          </Button>
        </div>
      </div>
      
      {/* <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="print:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Student Assessment Report
            </h2>
            <p className="text-muted-foreground">
              {/* Sameti - A Pre-academic Skills Program */}
             {/* {programName} */}
            {/* </p> */}
          {/* </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="print:hidden"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="print:hidden"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div> */} 
{/* 
      <div className="text-center mb-8 print:mb-6">
        <h1 className="text-2xl font-bold mb-2">
          <span> Program: {programName}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
          <div className="flex justify-between">
            <span className="font-medium">Name of Student:</span>
            <span>{studentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Term:</span>
            <span>{report.Term}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Name of Educator:</span>
            <span>{educatorName}</span>
          </div>

        </div>
      </div> */}

      <Tabs defaultValue="overview" className="space-y-3 print:block">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full print:hidden">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Report Details</TabsTrigger>
          <TabsTrigger value="progress">AI Insights</TabsTrigger>
          {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="print:block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Summary</CardTitle>
                <CardDescription>
                  Key information about {studentName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="font-medium">Attendance</div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        (Number.parseInt(report.Attendance) /
                          TotalWorkingDays) *
                        100
                      }
                      className="h-2 flex-1"
                    />
                    <span className="text-sm">
                      {report.Attendance}/{TotalWorkingDays} days (
                      {(
                        (Number.parseInt(report.Attendance) /
                          TotalWorkingDays) *
                        100
                      ).toFixed(1)}
                      %)
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-medium">TPS</div>
                  <div className="line-clamp-3">{report.TPS}</div>
                </div>

                <div className="space-y-1">
                  <div className="font-medium">Assistance Required</div>
                  <div>{report.Assistance}</div>
                </div>

                <div className="space-y-1">
                  <div className="font-medium">Parental Support</div>
                  <div>{report.ParentalSupport}</div>
                </div>

                <div className="space-y-1">
                  <div className="font-medium">Key Strengths</div>
                  <div className="line-clamp-3">{report.Strengths}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Assessment Overview</CardTitle>
                <CardDescription>
                  Average scores across skill areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={radarData}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} />
                      <Radar
                        name="Current Term"
                        dataKey="A"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Communication Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(
                    (report.FollowingInstructions +
                      report.PoliteWords +
                      report.AskingQuestions +
                      report.Conversation +
                      report.Describing +
                      report.Commenting +
                      report.EmotionalCommunication +
                      report.SentenceFormation) /
                    8
                  ).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Average score out of 5</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">Highest: Following Instructions ({report.FollowingInstructions})</div>
                  <div className="text-sm">
                    Lowest: Asking Questions & Conversation ({Math.min(report.AskingQuestions, report.Conversation)})
                  </div>
                </div>
              </CardContent>
            </Card> */}
            {report &&
              (() => {
                const { minField, minValue, maxField, maxValue } = getMinMax({
                  FollowingInstructions: report.FollowingInstructions,
                  PoliteWords: report.PoliteWords,
                  AskingQuestions: report.AskingQuestions,
                  Conversation: report.Conversation,
                  Describing: report.Describing,
                  Commenting: report.Commenting,
                  EmotionalCommunication: report.EmotionalCommunication,
                  SentenceFormation: report.SentenceFormation,
                });

                return (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Communication Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {(
                          (report.FollowingInstructions +
                            report.PoliteWords +
                            report.AskingQuestions +
                            report.Conversation +
                            report.Describing +
                            report.Commenting +
                            report.EmotionalCommunication +
                            report.SentenceFormation) /
                          8
                        ).toFixed(1)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Average score out of 5
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="text-sm">
                          Highest: {maxField} ({maxValue})
                        </div>
                        <div className="text-sm">
                          Lowest: {minField} ({minValue})
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}

            {/* <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Cognition Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(
                    (report.Prediction +
                      report.LogicalSequencing +
                      report.ProblemSolving +
                      report.CauseEffect +
                      report.DecisionMaking +
                      report.OddOneOut) /
                    6
                  ).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Average score out of 5</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    Highest: Multiple areas (
                    {Math.max(
                      report.Prediction,
                      report.LogicalSequencing,
                      report.CauseEffect,
                      report.DecisionMaking,
                      report.OddOneOut,
                    )}
                    )
                  </div>
                  <div className="text-sm">Lowest: Problem-Solving ({report.ProblemSolving})</div>
                </div>
              </CardContent>
            </Card> */}

            {report &&
              (() => {
                const { minField, minValue, maxField, maxValue } = getMinMax({
                  Prediction: report.Prediction,
                  LogicalSequencing: report.LogicalSequencing,
                  ProblemSolving: report.ProblemSolving,
                  CauseEffect: report.CauseEffect,
                  DecisionMaking: report.DecisionMaking,
                  OddOneOut: report.OddOneOut,
                });

                return (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Cognition Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {(
                          (report.Prediction +
                            report.LogicalSequencing +
                            report.ProblemSolving +
                            report.CauseEffect +
                            report.DecisionMaking +
                            report.OddOneOut) /
                          6
                        ).toFixed(1)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Average score out of 5
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="text-sm">
                          Highest: {maxField} ({maxValue})
                        </div>
                        <div className="text-sm">
                          Lowest: {minField} ({minValue})
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            {/* <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Functional Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(
                    (report.CopyingDrawing +
                      report.Pasting +
                      report.Folding +
                      report.Cutting +
                      report.KitchenUtensils +
                      report.Ingredients +
                      report.Pouring +
                      report.Scooping +
                      report.PersonalHygiene +
                      report.FoldingClothes +
                      report.FillingWater +
                      report.Packing +
                      report.Wiping +
                      report.GroupActivities) /
                    14
                  ).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Average score out of 5</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">Highest: Multiple areas (4.5)</div>
                  <div className="text-sm">Lowest: Personal Hygiene ({report.PersonalHygiene})</div>
                </div>
              </CardContent>
            </Card> */}
            {report &&
              (() => {
                const { minField, minValue, maxField, maxValue } = getMinMax({
                  CopyingDrawing: report.CopyingDrawing,
                  Pasting: report.Pasting,
                  Folding: report.Folding,
                  Cutting: report.Cutting,
                  KitchenUtensils: report.KitchenUtensils,
                  Ingredients: report.Ingredients,
                  Pouring: report.Pouring,
                  Scooping: report.Scooping,
                  PersonalHygiene: report.PersonalHygiene,
                  FoldingClothes: report.FoldingClothes,
                  FillingWater: report.FillingWater,
                  Packing: report.Packing,
                  Wiping: report.Wiping,
                  GroupActivities: report.GroupActivities,
                });

                return (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Functional Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {(
                          (report.CopyingDrawing +
                            report.Pasting +
                            report.Folding +
                            report.Cutting +
                            report.KitchenUtensils +
                            report.Ingredients +
                            report.Pouring +
                            report.Scooping +
                            report.PersonalHygiene +
                            report.FoldingClothes +
                            report.FillingWater +
                            report.Packing +
                            report.Wiping +
                            report.GroupActivities) /
                          14
                        ).toFixed(1)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Average score out of 5
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="text-sm">
                          Highest: {maxField} ({maxValue})
                        </div>
                        <div className="text-sm">
                          Lowest: {minField} ({minValue})
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
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
                    {report.Attendance} out of {TotalWorkingDays} working days
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">Punctuality and regularity</div>
                  <div>{report.Punctuality}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">
                    Preparedness for the sessions
                  </div>
                  <div>{report.Preparedness}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">Assistance required</div>
                  <div>{report.Assistance}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">
                  Any behavioural issues and modifications done
                </div>
                <div className="whitespace-pre-line">
                  {report.BehavioralIssues}
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">Parental support at home</div>
                <div>{report.ParentalSupport}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="whitespace-pre-line">
                {report.communicationNotes}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Following 2/3-step instructions
                      </span>
                      <span>{report.FollowingInstructions}</span>
                    </div>
                    <Progress
                      value={(report.FollowingInstructions / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Using polite words in various situations
                      </span>
                      <span>{report.PoliteWords}</span>
                    </div>
                    <Progress
                      value={(report.PoliteWords / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Ask "WH" Questions to obtain information
                      </span>
                      <span>{report.AskingQuestions}</span>
                    </div>
                    <Progress
                      value={(report.AskingQuestions / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Initiation and maintenance of conversation
                      </span>
                      <span>{report.Conversation}</span>
                    </div>
                    <Progress
                      value={(report.Conversation / 5) * 100}
                      className="h-2"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Describing and talking about an event, an object, or
                        people
                      </span>
                      <span>{report.Describing}</span>
                    </div>
                    <Progress
                      value={(report.Describing / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Commenting on objects or events
                      </span>
                      <span>{report.Commenting}</span>
                    </div>
                    <Progress
                      value={(report.Commenting / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Using appropriate words to communicate and reason their
                        emotions
                      </span>
                      <span>{report.EmotionalCommunication}</span>
                    </div>
                    <Progress
                      value={(report.EmotionalCommunication / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Making a simple sentence (subject + verb + object)
                      </span>
                      <span>{report.SentenceFormation}</span>
                    </div>
                    <Progress
                      value={(report.SentenceFormation / 5) * 100}
                      className="h-2"
                    />
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
                      <span>{report.Prediction}</span>
                    </div>
                    <Progress
                      value={(report.Prediction / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Logical sequencing</span>
                      <span>{report.LogicalSequencing}</span>
                    </div>
                    <Progress
                      value={(report.LogicalSequencing / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Problem-Solving</span>
                      <span>{report.ProblemSolving}</span>
                    </div>
                    <Progress
                      value={(report.ProblemSolving / 5) * 100}
                      className="h-2"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Cause & effect</span>
                      <span>{report.CauseEffect}</span>
                    </div>
                    <Progress
                      value={(report.CauseEffect / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Decision making</span>
                      <span>{report.DecisionMaking}</span>
                    </div>
                    <Progress
                      value={(report.DecisionMaking / 5) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Odd One Out + Reasoning
                      </span>
                      <span>{report.OddOneOut}</span>
                    </div>
                    <Progress
                      value={(report.OddOneOut / 5) * 100}
                      className="h-2"
                    />
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
                <div className="font-medium">
                  English - Reading & Comprehension
                </div>
                <div>{report.EnglishReading}</div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">English - Writing & Grammar</div>
                <div>{report.EnglishWriting}</div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">Environmental Studies (EVS)</div>
                <div>{report.EVS}</div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">Numeracy/Mathematics</div>
                <div>{report.Math}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Strengths and Learning Environment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="font-medium">
                  Strengths and Current Interests
                </div>
                <div className="whitespace-pre-line">{report.Strengths}</div>
              </div>

              <div className="space-y-1">
                <div className="font-medium">
                  The Optimal Learning Environment
                </div>
                <div className="whitespace-pre-line">
                  {report.LearningEnvironment}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tracking Tab */}
        <TabsContent value="progress">
          {/* {report.AIInsights} */}

          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
              <CardContent className="space-y-4">

          <ReactMarkdown>{report.AIInsights}</ReactMarkdown>
          </CardContent>
          </Card>
          </TabsContent>
      </Tabs>
    </div>
  );
}

function setError(message: any) {
  throw new Error("Function not implemented.");
}



//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h2 className="text-2xl font-bold tracking-tight">Welcome, {user ? user.userName : "Student"}!</h2>
//           <p className="text-muted-foreground">Track your progress and stay connected with your teachers.</p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline">
//             <Calendar className="mr-2 h-4 w-4" />
//             View Schedule
//           </Button>
//           <Button className="bg-primary hover:bg-primary/90">
//             <MessageSquare className="mr-2 h-4 w-4" />
//             Message Teacher
//           </Button>
//         </div>
//       </div>

//       {/* Progress Overview */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="border-l-4 border-l-primary">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
//             <Trophy className="h-4 w-4 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">78%</div>
//             <Progress value={78} className="h-2 mt-2" />
//             <p className="text-xs text-muted-foreground mt-2">You're doing great! Keep up the good work.</p>
//           </CardContent>
//         </Card>

//         <Card className="border-l-4 border-l-secondary">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
//             <BookOpen className="h-4 w-4 text-secondary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">3</div>
//             <div className="flex flex-wrap gap-1 mt-2">
//               <Badge variant="outline" className="bg-secondary/10">
//                 Digital Literacy
//               </Badge>
//               <Badge variant="outline" className="bg-secondary/10">
//                 Communication
//               </Badge>
//               <Badge variant="outline" className="bg-secondary/10">
//                 Life Skills
//               </Badge>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-l-4 border-l-yellow-500">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
//             <FileText className="h-4 w-4 text-yellow-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">2</div>
//             <div className="space-y-1 mt-2">
//               <p className="text-xs">Excel Formulas (Due: Tomorrow)</p>
//               <p className="text-xs">PowerPoint Presentation (Due: Friday)</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-l-4 border-l-green-500">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
//             <Calendar className="h-4 w-4 text-green-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1</div>
//             <div className="mt-2">
//               <p className="text-xs font-medium">Digital Literacy</p>
//               <p className="text-xs text-muted-foreground">Tomorrow at 10:00 AM</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Progress Charts */}
//       <div className="grid gap-4 md:grid-cols-7">
//         <Card className="md:col-span-4">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle>Progress Over Time</CardTitle>
//                 <CardDescription>Your learning progress over the past months</CardDescription>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   variant={selectedTimeframe === "3months" ? "secondary" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedTimeframe("3months")}
//                 >
//                   3M
//                 </Button>
//                 <Button
//                   variant={selectedTimeframe === "6months" ? "secondary" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedTimeframe("6months")}
//                 >
//                   6M
//                 </Button>
//                 <Button
//                   variant={selectedTimeframe === "1year" ? "secondary" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedTimeframe("1year")}
//                 >
//                   1Y
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <RechartsLineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis domain={[0, 100]} />
//                   <Tooltip content={<ChartTooltip />} />
//                   <Line
//                     type="monotone"
//                     dataKey="score"
//                     stroke="hsl(var(--primary))"
//                     strokeWidth={2}
//                     activeDot={{ r: 8 }}
//                     name="Progress Score"
//                   />
//                 </RechartsLineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="md:col-span-3">
//           <CardHeader>
//             <CardTitle>Skills Breakdown</CardTitle>
//             <CardDescription>Your proficiency in different skill areas</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
//                   <PolarGrid />
//                   <PolarAngleAxis dataKey="subject" />
//                   <PolarRadiusAxis angle={30} domain={[0, 100]} />
//                   <Radar
//                     name="Skills"
//                     dataKey="A"
//                     stroke="hsl(var(--primary))"
//                     fill="hsl(var(--primary))"
//                     fillOpacity={0.6}
//                   />
//                   <Legend />
//                 </RadarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Detailed Progress */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Skill Progress</CardTitle>
//           <CardDescription>Your progress in key skill areas</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="h-4 w-4 rounded-full bg-primary"></div>
//                   <span className="font-medium">Computer Basics</span>
//                 </div>
//                 <span>85%</span>
//               </div>
//               <Progress value={85} className="h-2" />
//               <p className="text-xs text-muted-foreground">Excellent understanding of hardware and software concepts</p>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="h-4 w-4 rounded-full bg-secondary"></div>
//                   <span className="font-medium">Internet Skills</span>
//                 </div>
//                 <span>90%</span>
//               </div>
//               <Progress value={90} className="h-2" />
//               <p className="text-xs text-muted-foreground">Strong ability to navigate and use online resources</p>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
//                   <span className="font-medium">Microsoft Office</span>
//                 </div>
//                 <span>75%</span>
//               </div>
//               <Progress value={75} className="h-2" />
//               <p className="text-xs text-muted-foreground">
//                 Good progress with Word and PowerPoint, needs work on Excel
//               </p>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="h-4 w-4 rounded-full bg-green-500"></div>
//                   <span className="font-medium">Email & Communication</span>
//                 </div>
//                 <span>80%</span>
//               </div>
//               <Progress value={80} className="h-2" />
//               <p className="text-xs text-muted-foreground">Effective at composing and managing emails</p>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="h-4 w-4 rounded-full bg-blue-500"></div>
//                   <span className="font-medium">Online Safety</span>
//                 </div>
//                 <span>70%</span>
//               </div>
//               <Progress value={70} className="h-2" />
//               <p className="text-xs text-muted-foreground">
//                 Understanding of basic security practices, needs more practice
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Tabs defaultValue="reports">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="reports">Assessment Reports</TabsTrigger>
//           <TabsTrigger value="courses">My Courses</TabsTrigger>
//           <TabsTrigger value="messages">Messages</TabsTrigger>
//         </TabsList>

//         <TabsContent value="reports" className="mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>My Assessment Reports</CardTitle>
//               <CardDescription>View your progress assessment reports</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors">
//                   <div className="flex items-center gap-4">
//                     <div className="bg-primary/10 p-2 rounded-full">
//                       <FileText className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <div className="font-medium">Term 2 Assessment Report</div>
//                       <div className="text-sm text-muted-foreground">December 15, 2024 • By Priya Sharma</div>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button variant="outline" size="sm" asChild>
//                       <Link href="/dashboard/student/reports/view/1">View Report</Link>
//                     </Button>
//                     <Button variant="outline" size="sm">
//                       <Download className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors">
//                   <div className="flex items-center gap-4">
//                     <div className="bg-primary/10 p-2 rounded-full">
//                       <FileText className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <div className="font-medium">Term 1 Assessment Report</div>
//                       <div className="text-sm text-muted-foreground">August 20, 2024 • By Priya Sharma</div>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button variant="outline" size="sm" asChild>
//                       <Link href="/dashboard/student/reports/view/4">View Report</Link>
//                     </Button>
//                     <Button variant="outline" size="sm">
//                       <Download className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>

//                 <Button variant="outline" className="w-full" asChild>
//                   <Link href="/dashboard/student/reports">
//                     View All Reports
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="courses" className="mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>My Courses</CardTitle>
//               <CardDescription>Your enrolled courses and progress</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-5">
//               <CourseCard
//                 title="Digital Literacy"
//                 progress={85}
//                 teacher="Priya Sharma"
//                 nextSession="Tomorrow, 10:00 AM"
//                 image="/placeholder.svg?height=40&width=40"
//               />
//               <CourseCard
//                 title="Communication Skills"
//                 progress={65}
//                 teacher="Rahul Verma"
//                 nextSession="Wednesday, 2:00 PM"
//                 image="/placeholder.svg?height=40&width=40"
//               />
//               <CourseCard
//                 title="Life Skills"
//                 progress={40}
//                 teacher="Anita Desai"
//                 nextSession="Friday, 11:00 AM"
//                 image="/placeholder.svg?height=40&width=40"
//               />

//               <Button variant="outline" className="w-full" asChild>
//                 <Link href="/dashboard/student/courses">
//                   View All Courses
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="messages" className="mt-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Messages from Teachers</CardTitle>
//               <CardDescription>Recent communications</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-start gap-3 pb-4 border-b">
//                 <Avatar>
//                   <AvatarImage src="/placeholder.svg?height=40&width=40" />
//                   <AvatarFallback>PS</AvatarFallback>
//                 </Avatar>
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2">
//                     <p className="font-medium text-sm">Priya Sharma</p>
//                     <span className="text-xs text-muted-foreground">2 hours ago</span>
//                   </div>
//                   <p className="text-sm">
//                     Great job on your last assignment! I've added some feedback for you to review.
//                   </p>
//                   <Button variant="link" className="h-auto p-0 text-primary" asChild>
//                     <Link href="/dashboard/student/messages">Reply</Link>
//                   </Button>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Avatar>
//                   <AvatarImage src="/placeholder.svg?height=40&width=40" />
//                   <AvatarFallback>RV</AvatarFallback>
//                 </Avatar>
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2">
//                     <p className="font-medium text-sm">Rahul Verma</p>
//                     <span className="text-xs text-muted-foreground">Yesterday</span>
//                   </div>
//                   <p className="text-sm">Don't forget to prepare for our group discussion in the next session.</p>
//                   <Button variant="link" className="h-auto p-0 text-primary" asChild>
//                     <Link href="/dashboard/student/messages">Reply</Link>
//                   </Button>
//                 </div>
//               </div>

//               <Button className="w-full mt-2" variant="outline" asChild>
//                 <Link href="/dashboard/student/messages">
//                   View All Messages
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {/* Upcoming Schedule */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Upcoming Schedule</CardTitle>
//           <CardDescription>Your sessions for the next 7 days</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
//               <div className="bg-primary/10 p-2 rounded-full">
//                 <Calendar className="h-5 w-5 text-primary" />
//               </div>
//               <div className="flex-1">
//                 <div className="font-medium">Digital Literacy Session</div>
//                 <div className="text-sm text-muted-foreground">With Priya Sharma</div>
//               </div>
//               <div className="text-right">
//                 <div className="font-medium">Tomorrow</div>
//                 <div className="text-sm text-muted-foreground">10:00 - 11:30 AM</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 p-3 rounded-lg">
//               <div className="bg-primary/10 p-2 rounded-full">
//                 <Calendar className="h-5 w-5 text-primary" />
//               </div>
//               <div className="flex-1">
//                 <div className="font-medium">Communication Skills Workshop</div>
//                 <div className="text-sm text-muted-foreground">With Rahul Verma</div>
//               </div>
//               <div className="text-right">
//                 <div className="font-medium">Wednesday</div>
//                 <div className="text-sm text-muted-foreground">2:00 - 4:00 PM</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 p-3 rounded-lg">
//               <div className="bg-primary/10 p-2 rounded-full">
//                 <Calendar className="h-5 w-5 text-primary" />
//               </div>
//               <div className="flex-1">
//                 <div className="font-medium">Life Skills Training</div>
//                 <div className="text-sm text-muted-foreground">With Anita Desai</div>
//               </div>
//               <div className="text-right">
//                 <div className="font-medium">Friday</div>
//                 <div className="text-sm text-muted-foreground">11:00 AM - 12:30 PM</div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// function CourseCard({
//   title,
//   progress,
//   teacher,
//   nextSession,
//   image,
// }: {
//   title: string
//   progress: number
//   teacher: string
//   nextSession: string
//   image: string
// }) {
//   return (
//     <div className="flex items-start gap-4">
//       <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
//         <BookOpen className="h-6 w-6 text-primary" />
//       </div>
//       <div className="flex-1 space-y-2">
//         <div className="flex items-center justify-between">
//           <h4 className="font-medium">{title}</h4>
//           <div className="flex items-center gap-1">
//             <Star className="h-4 w-4 fill-primary text-primary" />
//             <span className="text-sm">{progress}%</span>
//           </div>
//         </div>
//         <Progress value={progress} className="h-2" />
//         <div className="flex items-center justify-between text-sm">
//           <div className="flex items-center gap-2">
//             <Avatar className="h-5 w-5">
//               <AvatarImage src={image} />
//               <AvatarFallback>
//                 {teacher
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </AvatarFallback>
//             </Avatar>
//             <span className="text-muted-foreground">{teacher}</span>
//           </div>
//           <div className="flex items-center gap-1 text-muted-foreground">
//             <Clock className="h-3 w-3" />
//             <span>{nextSession}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

