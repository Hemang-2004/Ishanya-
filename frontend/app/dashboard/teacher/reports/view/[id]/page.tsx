"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, Edit, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

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
}

export default function ViewReportPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [report, setReport] = useState(mockReportData)
  const [loading, setLoading] = useState(true)

  // In a real app, you would fetch the report data from your API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
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
          <Button onClick={() => router.push(`/dashboard/teacher/reports/edit/${report.id}`)} className="print:hidden">
            <Edit className="mr-2 h-4 w-4" />
            Edit Report
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

      <Tabs defaultValue="general" className="space-y-4 print:block">
        <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full print:hidden">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="cognition">Cognition</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="functional">Functional Skills</TabsTrigger>
          <TabsTrigger value="extracurricular">Extracurricular</TabsTrigger>
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
        </TabsList>

        {/* General Observations Tab */}
        <TabsContent value="general" className="print:block print:break-before-page">
          <Card className="print:shadow-none print:border-none">
            <CardHeader className="print:pb-2">
              <CardTitle className="print:text-xl">General Observations</CardTitle>
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
        </TabsContent>

        {/* Communication Skills Tab */}
        <TabsContent value="communication" className="print:block print:break-before-page">
          <Card className="print:shadow-none print:border-none">
            <CardHeader className="print:pb-2">
              <CardTitle className="print:text-xl">Communication Skills</CardTitle>
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
        </TabsContent>

        {/* Cognition Tab */}
        <TabsContent value="cognition" className="print:block print:break-before-page">
          <Card className="print:shadow-none print:border-none">
            <CardHeader className="print:pb-2">
              <CardTitle className="print:text-xl">Cognition Skills</CardTitle>
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
        </TabsContent>

        {/* Academics Tab */}
        <TabsContent value="academics" className="print:block print:break-before-page">
          <Card className="print:shadow-none print:border-none">
            <CardHeader className="print:pb-2">
              <CardTitle className="print:text-xl">Academic Skills - OBE Level A</CardTitle>
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
        </TabsContent>

        {/* Functional Skills Tab */}
        <TabsContent value="functional" className="print:block print:break-before-page">
          <Card className="print:shadow-none print:border-none">
            <CardHeader className="print:pb-2">
              <CardTitle className="print:text-xl">Functional Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="whitespace-pre-line">{report.functionalNotes}</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Art and Craft Skills</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Copying simple lines, drawings and shapes</span>
                        <span>{report.copyingDrawing}</span>
                      </div>
                      <Progress value={(report.copyingDrawing / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Pasting</span>
                        <span>{report.pasting}</span>
                      </div>
                      <Progress value={(report.pasting / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Folding (origami papers)</span>
                        <span>{report.folding}</span>
                      </div>
                      <Progress value={(report.folding / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Cutting with scissors on the line</span>
                        <span>{report.cutting}</span>
                      </div>
                      <Progress value={(report.cutting / 5) * 100} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Cooking without fire Skills</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Knowing names of various utensils in the kitchen</span>
                        <span>{report.kitchenUtensils}</span>
                      </div>
                      <Progress value={(report.kitchenUtensils / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Knowing names of various ingredients</span>
                        <span>{report.ingredients}</span>
                      </div>
                      <Progress value={(report.ingredients / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Pouring</span>
                        <span>{report.pouring}</span>
                      </div>
                      <Progress value={(report.pouring / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Scooping</span>
                        <span>{report.scooping}</span>
                      </div>
                      <Progress value={(report.scooping / 5) * 100} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-medium mb-4">Life Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Personal hygiene</span>
                        <span>{report.personalHygiene}</span>
                      </div>
                      <Progress value={(report.personalHygiene / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Folding clothes</span>
                        <span>{report.foldingClothes}</span>
                      </div>
                      <Progress value={(report.foldingClothes / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Filling water bottles</span>
                        <span>{report.fillingWater}</span>
                      </div>
                      <Progress value={(report.fillingWater / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Packing your bag</span>
                        <span>{report.packing}</span>
                      </div>
                      <Progress value={(report.packing / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Wiping</span>
                        <span>{report.wiping}</span>
                      </div>
                      <Progress value={(report.wiping / 5) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Group activities (turn taking, collaborative play)</span>
                        <span>{report.groupActivities}</span>
                      </div>
                      <Progress value={(report.groupActivities / 5) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Extracurricular Tab */}
        <TabsContent value="extracurricular" className="print:block print:break-before-page">
          <Card className="print:shadow-none print:border-none">
            <CardHeader className="print:pb-2">
              <CardTitle className="print:text-xl">Extracurricular Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line">{report.extracurricular}</div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strengths Tab */}
        <TabsContent value="strengths" className="print:block print:break-before-page">
          <Card className="print:shadow-none print:border-none">
            <CardHeader className="print:pb-2">
              <CardTitle className="print:text-xl">Strengths and Learning Environment</CardTitle>
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
      </Tabs>
    </div>
  )
}

