"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, Dimensions, ActivityIndicator } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { LineChart, BarChart } from "react-native-chart-kit"

const screenWidth = Dimensions.get("window").width

interface FeedbackMetrics {
  AcademicSkills: {
    EVS: string
    EnglishReading: string
    EnglishWriting: string
    Math: string
  }
  Assistance: string
  BehavioralIssues: string
  CognitionSkills: {
    CauseEffect: number
    DecisionMaking: number
    LogicalSequencing: number
    Notes: string
    OddOneOut: number
    Prediction: number
    ProblemSolving: number
  }
  CommunicationSkills: {
    AskingQuestions: number
    Commenting: number
    Conversation: number
    Describing: number
    EmotionalCommunication: number
    FollowingInstructions: number
    Notes: string
    PoliteWords: number
    SentenceFormation: number
  }
  Extracurricular: string
  FunctionalSkills: {
    CopyingDrawing: number
    Cutting: number
    FillingWater: number
    Folding: number
    FoldingClothes: number
    GroupActivities: number
    Ingredients: number
    KitchenUtensils: number
    Notes: string
    Packing: number
    Pasting: number
    PersonalHygiene: number
    Pouring: number
    Scooping: number
    Wiping: number
  }
  LearningEnvironment: string
  ParentalSupport: string
  Preparedness: string
  Punctuality: string
  Strengths: string
}

interface FeedbackReport {
  Attendance: number
  Comments: string
  EducatorID: string
  FeedbackMetrics: FeedbackMetrics
  StudentID: number
  TPS: string
  Term: number
}

interface FeedbackReportProps {
  feedbackData: any // Changed to any to handle string or object
  visible: boolean
  onClose: () => void
}

// Custom radar chart component since react-native-chart-kit doesn't have one
const CustomRadarChart = ({ data, size = 200, color = "#408c4c" }) => {
  const maxValue = 5 // Maximum value for skills (assuming 5 is max)
  const centerX = size / 2
  const centerY = size / 2
  const radius = size * 0.4

  // Calculate positions for each data point
  const getPointCoordinates = (index, value) => {
    const angle = (Math.PI * 2 * index) / data.labels.length - Math.PI / 2
    const normalizedValue = value / maxValue // Normalize to 0-1
    const x = centerX + radius * normalizedValue * Math.cos(angle)
    const y = centerY + radius * normalizedValue * Math.sin(angle)
    return { x, y }
  }

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      {/* Background circles */}
      <View style={[styles.radarCircle, { width: radius * 2, height: radius * 2 }]} />
      <View style={[styles.radarCircle, { width: radius * 1.5, height: radius * 1.5 }]} />
      <View style={[styles.radarCircle, { width: radius, height: radius }]} />
      <View style={[styles.radarCircle, { width: radius * 0.5, height: radius * 0.5 }]} />

      {/* Axis lines */}
      {data.labels.map((label, index) => {
        const angle = (Math.PI * 2 * index) / data.labels.length - Math.PI / 2
        const endX = centerX + radius * Math.cos(angle)
        const endY = centerY + radius * Math.sin(angle)

        return (
          <View
            key={`axis-${index}`}
            style={{
              position: "absolute",
              width: 1,
              height: radius,
              backgroundColor: "#ddd",
              top: centerY,
              left: centerX,
              transform: [{ translateY: -radius / 2 }, { rotate: `${(angle + Math.PI / 2) * (180 / Math.PI)}deg` }],
            }}
          />
        )
      })}

      {/* Data polygon */}
      <View
        style={{
          position: "absolute",
          width: size,
          height: size,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data.datasets[0].data.map((value, index) => {
          const { x, y } = getPointCoordinates(index, value)
          return (
            <View
              key={`point-${index}`}
              style={{
                position: "absolute",
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: color,
                left: x - 4,
                top: y - 4,
              }}
            />
          )
        })}

        {/* Connect the dots */}
        {data.datasets[0].data.map((value, index) => {
          const { x: x1, y: y1 } = getPointCoordinates(index, value)
          const { x: x2, y: y2 } = getPointCoordinates(
            (index + 1) % data.datasets[0].data.length,
            data.datasets[0].data[(index + 1) % data.datasets[0].data.length],
          )

          const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)
          const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

          return (
            <View
              key={`line-${index}`}
              style={{
                position: "absolute",
                width: distance,
                height: 2,
                backgroundColor: color,
                left: x1,
                top: y1,
                transform: [{ translateX: 0 }, { translateY: -1 }, { rotate: `${angle}deg` }, { translateX: 0 }],
              }}
            />
          )
        })}
      </View>

      {/* Labels */}
      {data.labels.map((label, index) => {
        const angle = (Math.PI * 2 * index) / data.labels.length - Math.PI / 2
        const x = centerX + (radius + 20) * Math.cos(angle)
        const y = centerY + (radius + 20) * Math.sin(angle)

        return (
          <Text
            key={`label-${index}`}
            style={{
              position: "absolute",
              left: x - 40,
              top: y - 10,
              width: 80,
              textAlign: "center",
              fontSize: 12,
              color: "#333",
            }}
          >
            {label}
          </Text>
        )
      })}
    </View>
  )
}

const FeedbackReport: React.FC<FeedbackReportProps> = ({ feedbackData, visible, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [parsedData, setParsedData] = useState<FeedbackReport | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Parse the feedback data if it's a string
  React.useEffect(() => {
    if (!feedbackData) {
      setIsLoading(true)
      return
    }

    try {
      // If feedbackData is a string, try to parse it
      const parsed = typeof feedbackData === "string" ? JSON.parse(feedbackData) : feedbackData
      setParsedData(parsed)
      setIsLoading(false)
    } catch (error) {
      console.error("Error parsing feedback data:", error)
      setIsLoading(false)
    }
  }, [feedbackData])

  // Calculate average scores for each skill category
  const calculateAverage = (values: number[]) => {
    if (!values || values.length === 0) return 0
    const sum = values.reduce((acc, val) => acc + val, 0)
    return Number.parseFloat((sum / values.length).toFixed(1))
  }

  // Only calculate these if we have valid data
  const cognitionAvg = parsedData?.FeedbackMetrics?.CognitionSkills
    ? calculateAverage(
        Object.values(parsedData.FeedbackMetrics.CognitionSkills).filter((val) => typeof val === "number") as number[],
      )
    : 0

  const communicationAvg = parsedData?.FeedbackMetrics?.CommunicationSkills
    ? calculateAverage(
        Object.values(parsedData.FeedbackMetrics.CommunicationSkills).filter(
          (val) => typeof val === "number",
        ) as number[],
      )
    : 0

  const functionalAvg = parsedData?.FeedbackMetrics?.FunctionalSkills
    ? calculateAverage(
        Object.values(parsedData.FeedbackMetrics.FunctionalSkills).filter((val) => typeof val === "number") as number[],
      )
    : 0

  // Data for radar chart
  const radarData = {
    labels: ["Cognition", "Communication", "Functional"],
    datasets: [
      {
        data: [cognitionAvg, communicationAvg, functionalAvg],
      },
    ],
  }

  // Data for cognition skills bar chart
  const cognitionData = parsedData?.FeedbackMetrics?.CognitionSkills
    ? {
        labels: ["Cause-Effect", "Decision", "Logic", "Odd One", "Prediction", "Problem"],
        datasets: [
          {
            data: [
              parsedData.FeedbackMetrics.CognitionSkills.CauseEffect || 0,
              parsedData.FeedbackMetrics.CognitionSkills.DecisionMaking || 0,
              parsedData.FeedbackMetrics.CognitionSkills.LogicalSequencing || 0,
              parsedData.FeedbackMetrics.CognitionSkills.OddOneOut || 0,
              parsedData.FeedbackMetrics.CognitionSkills.Prediction || 0,
              parsedData.FeedbackMetrics.CognitionSkills.ProblemSolving || 0,
            ],
          },
        ],
      }
    : {
        labels: ["No Data"],
        datasets: [{ data: [0] }],
      }

  // Data for communication skills bar chart
  const communicationData = parsedData?.FeedbackMetrics?.CommunicationSkills
    ? {
        labels: ["Questions", "Comments", "Convo", "Describe", "Emotional", "Instructions", "Polite", "Sentences"],
        datasets: [
          {
            data: [
              parsedData.FeedbackMetrics.CommunicationSkills.AskingQuestions || 0,
              parsedData.FeedbackMetrics.CommunicationSkills.Commenting || 0,
              parsedData.FeedbackMetrics.CommunicationSkills.Conversation || 0,
              parsedData.FeedbackMetrics.CommunicationSkills.Describing || 0,
              parsedData.FeedbackMetrics.CommunicationSkills.EmotionalCommunication || 0,
              parsedData.FeedbackMetrics.CommunicationSkills.FollowingInstructions || 0,
              parsedData.FeedbackMetrics.CommunicationSkills.PoliteWords || 0,
              parsedData.FeedbackMetrics.CommunicationSkills.SentenceFormation || 0,
            ],
          },
        ],
      }
    : {
        labels: ["No Data"],
        datasets: [{ data: [0] }],
      }

  // Data for functional skills line chart
  const functionalData = parsedData?.FeedbackMetrics?.FunctionalSkills
    ? {
        labels: ["Drawing", "Cutting", "Water", "Fold", "Clothes", "Group", "Hygiene"],
        datasets: [
          {
            data: [
              parsedData.FeedbackMetrics.FunctionalSkills.CopyingDrawing || 0,
              parsedData.FeedbackMetrics.FunctionalSkills.Cutting || 0,
              parsedData.FeedbackMetrics.FunctionalSkills.FillingWater || 0,
              parsedData.FeedbackMetrics.FunctionalSkills.Folding || 0,
              parsedData.FeedbackMetrics.FunctionalSkills.FoldingClothes || 0,
              parsedData.FeedbackMetrics.FunctionalSkills.GroupActivities || 0,
              parsedData.FeedbackMetrics.FunctionalSkills.PersonalHygiene || 0,
            ],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2,
          },
        ],
        legend: ["Functional Skills"],
      }
    : {
        labels: ["No Data"],
        datasets: [
          {
            data: [0],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2,
          },
        ],
        legend: ["No Data"],
      }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(64, 140, 76, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#408c4c",
    },
  }

  const renderSkillRating = (value: number) => {
    if (value === undefined || value === null) {
      return <Text style={styles.noDataText}>No data</Text>
    }

    const stars = []
    const fullStars = Math.floor(value)
    const halfStar = value % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<MaterialIcons key={i} name="star" size={16} color="#FFD700" />)
      } else if (i === fullStars && halfStar) {
        stars.push(<MaterialIcons key={i} name="star-half" size={16} color="#FFD700" />)
      } else {
        stars.push(<MaterialIcons key={i} name="star-outline" size={16} color="#FFD700" />)
      }
    }
    return (
      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>{stars}</View>
        <Text style={styles.ratingText}>{value.toFixed(1)}</Text>
      </View>
    )
  }

  const renderOverviewTab = () => {
    if (!parsedData || !parsedData.FeedbackMetrics) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No feedback data available</Text>
        </View>
      )
    }

    return (
      <View style={styles.tabContent}>
        <View style={styles.overviewContainer}>
          <View style={styles.headerCard}>
            <Text style={styles.headerTitle}>Term {parsedData.Term} Feedback Report</Text>
            <Text style={styles.headerSubtitle}>Student ID: {parsedData.StudentID}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.cardTitle}>Skills Overview</Text>
            <View style={styles.chartContainer}>
              <CustomRadarChart data={radarData} size={screenWidth - 60} color="#8B4513" />
            </View>

            <View style={styles.skillSummaryContainer}>
              <View style={styles.skillSummaryItem}>
                <Text style={styles.skillSummaryLabel}>Cognition:</Text>
                <Text style={styles.skillSummaryValue}>{cognitionAvg.toFixed(1)}/5</Text>
              </View>
              <View style={styles.skillSummaryItem}>
                <Text style={styles.skillSummaryLabel}>Communication:</Text>
                <Text style={styles.skillSummaryValue}>{communicationAvg.toFixed(1)}/5</Text>
              </View>
              <View style={styles.skillSummaryItem}>
                <Text style={styles.skillSummaryLabel}>Functional:</Text>
                <Text style={styles.skillSummaryValue}>{functionalAvg.toFixed(1)}/5</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>General Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Assistance:</Text>
              <Text style={styles.infoValue}>{parsedData.FeedbackMetrics.Assistance || "Not specified"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Preparedness:</Text>
              <Text style={styles.infoValue}>{parsedData.FeedbackMetrics.Preparedness || "Not specified"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Punctuality:</Text>
              <Text style={styles.infoValue}>{parsedData.FeedbackMetrics.Punctuality || "Not specified"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Parental Support:</Text>
              <Text style={styles.infoValue}>{parsedData.FeedbackMetrics.ParentalSupport || "Not specified"}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderCognitionTab = () => {
    if (!parsedData?.FeedbackMetrics?.CognitionSkills) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No cognition data available</Text>
        </View>
      )
    }

    return (
      <View style={styles.tabContent}>
        <View style={styles.skillCard}>
          <Text style={styles.cardTitle}>Cognition Skills</Text>
          <Text style={styles.averageScore}>Average Score: {cognitionAvg.toFixed(1)}/5</Text>

          <View style={styles.chartContainer}>
            <BarChart
              data={cognitionData}
              width={screenWidth - 60}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              fromZero
              yAxisSuffix=""
            />
          </View>

          <View style={styles.skillsContainer}>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Cause & Effect:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CognitionSkills.CauseEffect)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Decision Making:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CognitionSkills.DecisionMaking)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Logical Sequencing:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CognitionSkills.LogicalSequencing)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Odd One Out:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CognitionSkills.OddOneOut)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Prediction:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CognitionSkills.Prediction)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Problem Solving:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CognitionSkills.ProblemSolving)}
            </View>
          </View>

          {parsedData.FeedbackMetrics.CognitionSkills.Notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesTitle}>Notes:</Text>
              <Text style={styles.notesText}>{parsedData.FeedbackMetrics.CognitionSkills.Notes}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  const renderCommunicationTab = () => {
    if (!parsedData?.FeedbackMetrics?.CommunicationSkills) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No communication data available</Text>
        </View>
      )
    }

    return (
      <View style={styles.tabContent}>
        <View style={styles.skillCard}>
          <Text style={styles.cardTitle}>Communication Skills</Text>
          <Text style={styles.averageScore}>Average Score: {communicationAvg.toFixed(1)}/5</Text>

          <View style={styles.chartContainer}>
            <BarChart
              data={communicationData}
              width={screenWidth - 60}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
              }}
              style={styles.chart}
              fromZero
              yAxisSuffix=""
            />
          </View>

          <View style={styles.skillsContainer}>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Asking Questions:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CommunicationSkills.AskingQuestions)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Commenting:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CommunicationSkills.Commenting)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Conversation:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CommunicationSkills.Conversation)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Describing:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CommunicationSkills.Describing)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Emotional Communication:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CommunicationSkills.EmotionalCommunication)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Following Instructions:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CommunicationSkills.FollowingInstructions)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Polite Words:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CommunicationSkills.PoliteWords)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Sentence Formation:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.CommunicationSkills.SentenceFormation)}
            </View>
          </View>

          {parsedData.FeedbackMetrics.CommunicationSkills.Notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesTitle}>Notes:</Text>
              <Text style={styles.notesText}>{parsedData.FeedbackMetrics.CommunicationSkills.Notes}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  const renderFunctionalTab = () => {
    if (!parsedData?.FeedbackMetrics?.FunctionalSkills) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No functional skills data available</Text>
        </View>
      )
    }

    return (
      <View style={styles.tabContent}>
        <View style={styles.skillCard}>
          <Text style={styles.cardTitle}>Functional Skills</Text>
          <Text style={styles.averageScore}>Average Score: {functionalAvg.toFixed(1)}/5</Text>

          <View style={styles.chartContainer}>
            <LineChart
              data={functionalData}
              width={screenWidth - 60}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
              }}
              style={styles.chart}
              bezier
            />
          </View>

          <View style={styles.skillsContainer}>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Copying Drawing:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.FunctionalSkills.CopyingDrawing)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Cutting:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.FunctionalSkills.Cutting)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Filling Water:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.FunctionalSkills.FillingWater)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Folding:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.FunctionalSkills.Folding)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Folding Clothes:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.FunctionalSkills.FoldingClothes)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Group Activities:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.FunctionalSkills.GroupActivities)}
            </View>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Personal Hygiene:</Text>
              {renderSkillRating(parsedData.FeedbackMetrics.FunctionalSkills.PersonalHygiene)}
            </View>
          </View>

          {parsedData.FeedbackMetrics.FunctionalSkills.Notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesTitle}>Notes:</Text>
              <Text style={styles.notesText}>{parsedData.FeedbackMetrics.FunctionalSkills.Notes}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  const renderAcademicTab = () => {
    if (!parsedData?.FeedbackMetrics?.AcademicSkills) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No academic skills data available</Text>
        </View>
      )
    }

    return (
      <View style={styles.tabContent}>
        <View style={styles.skillCard}>
          <Text style={styles.cardTitle}>Academic Skills</Text>

          <View style={styles.academicContainer}>
            {parsedData.FeedbackMetrics.AcademicSkills.EnglishReading && (
              <View style={styles.academicItem}>
                <Text style={styles.academicLabel}>English Reading:</Text>
                <Text style={styles.academicValue}>{parsedData.FeedbackMetrics.AcademicSkills.EnglishReading}</Text>
              </View>
            )}

            {parsedData.FeedbackMetrics.AcademicSkills.EnglishWriting && (
              <View style={styles.academicItem}>
                <Text style={styles.academicLabel}>English Writing:</Text>
                <Text style={styles.academicValue}>{parsedData.FeedbackMetrics.AcademicSkills.EnglishWriting}</Text>
              </View>
            )}

            {parsedData.FeedbackMetrics.AcademicSkills.Math && (
              <View style={styles.academicItem}>
                <Text style={styles.academicLabel}>Mathematics:</Text>
                <Text style={styles.academicValue}>{parsedData.FeedbackMetrics.AcademicSkills.Math}</Text>
              </View>
            )}

            {parsedData.FeedbackMetrics.AcademicSkills.EVS && (
              <View style={styles.academicItem}>
                <Text style={styles.academicLabel}>EVS:</Text>
                <Text style={styles.academicValue}>{parsedData.FeedbackMetrics.AcademicSkills.EVS}</Text>
              </View>
            )}
          </View>

          {parsedData.Comments && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesTitle}>Additional Comments:</Text>
              <Text style={styles.notesText}>{parsedData.Comments}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.reportContainer}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportHeaderText}>Student Feedback Report</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#333" />
            </Pressable>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#408c4c" />
              <Text style={styles.loadingText}>Loading feedback data...</Text>
            </View>
          ) : (
            <>
              <View style={styles.tabsContainer}>
                <Pressable
                  style={[styles.tabButton, activeTab === "overview" && styles.activeTabButton]}
                  onPress={() => setActiveTab("overview")}
                >
                  <Text style={[styles.tabButtonText, activeTab === "overview" && styles.activeTabButtonText]}>
                    Overview
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.tabButton, activeTab === "cognition" && styles.activeTabButton]}
                  onPress={() => setActiveTab("cognition")}
                >
                  <Text style={[styles.tabButtonText, activeTab === "cognition" && styles.activeTabButtonText]}>
                    Cognition
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.tabButton, activeTab === "communication" && styles.activeTabButton]}
                  onPress={() => setActiveTab("communication")}
                >
                  <Text style={[styles.tabButtonText, activeTab === "communication" && styles.activeTabButtonText]}>
                    Communication
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.tabButton, activeTab === "functional" && styles.activeTabButton]}
                  onPress={() => setActiveTab("functional")}
                >
                  <Text style={[styles.tabButtonText, activeTab === "functional" && styles.activeTabButtonText]}>
                    Functional
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.tabButton, activeTab === "academic" && styles.activeTabButton]}
                  onPress={() => setActiveTab("academic")}
                >
                  <Text style={[styles.tabButtonText, activeTab === "academic" && styles.activeTabButtonText]}>
                    Academic
                  </Text>
                </Pressable>
              </View>

              <ScrollView style={styles.reportContent}>
                {activeTab === "overview" && renderOverviewTab()}
                {activeTab === "cognition" && renderCognitionTab()}
                {activeTab === "communication" && renderCommunicationTab()}
                {activeTab === "functional" && renderFunctionalTab()}
                {activeTab === "academic" && renderAcademicTab()}
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  reportContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "90%",
    height: "85%",
    overflow: "hidden",
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "rgba(255, 216, 112, 0.9)",
  },
  reportHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  closeButton: {
    padding: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#408c4c",
  },
  tabButtonText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  activeTabButtonText: {
    color: "#408c4c",
    fontWeight: "bold",
    fontFamily: "JosefinSans-Bold",
  },
  reportContent: {
    flex: 1,
  },
  tabContent: {
    padding: 15,
  },
  overviewContainer: {
    gap: 15,
  },
  headerCard: {
    backgroundColor: "#FFF8DC",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#D2B48C",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  summaryCard: {
    backgroundColor: "#FFF8DC",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#D2B48C",
  },
  infoCard: {
    backgroundColor: "#FFF8DC",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#D2B48C",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    fontFamily: "JosefinSans-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#D2B48C",
    paddingBottom: 5,
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  chart: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  infoValue: {
    flex: 2,
    fontSize: 14,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  skillCard: {
    backgroundColor: "#FFF8DC",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#D2B48C",
  },
  averageScore: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#408c4c",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "JosefinSans-Bold",
  },
  skillsContainer: {
    marginTop: 15,
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  skillLabel: {
    fontSize: 14,
    color: "#333",
    fontFamily: "JosefinSans-Regular",
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  notesContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#408c4c",
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    fontFamily: "JosefinSans-Bold",
  },
  notesText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  academicContainer: {
    marginTop: 10,
  },
  academicItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  academicLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    fontFamily: "JosefinSans-Bold",
  },
  academicValue: {
    fontSize: 14,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  noDataContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
    textAlign: "center",
  },
  radarCircle: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 999,
  },
  skillSummaryContainer: {
    marginTop: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
  },
  skillSummaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  skillSummaryLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  skillSummaryValue: {
    fontSize: 14,
    color: "#408c4c",
    fontWeight: "bold",
    fontFamily: "JosefinSans-Regular",
  },
})

export default FeedbackReport

