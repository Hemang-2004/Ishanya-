"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { GoogleGenerativeAI } from "@google/generative-ai"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

interface AIChatProps {
  studentName?: string // Made optional
  onClose: () => void
  apiKey: string // Changed to accept the key as a prop
}

const AIChat: React.FC<AIChatProps> = ({ studentName = "Student", onClose, apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello ${studentName}! I'm your AI assistant. How can I help you with your studies today?`,
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  // Generate response using Gemini API
  const generateGeminiResponse = async (userMessage: string) => {
    setIsLoading(true)

    try {
      // Initialize the API with the provided key
      const genAI = new GoogleGenerativeAI(apiKey)

      // Get the model
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" })

      // Create conversation history for context
      const conversationHistory = messages
        .map((msg) => `${msg.sender === "user" ? studentName : "Assistant"}: ${msg.text}`)
        .join("\n")

      // Create the prompt with context
      const prompt = `
        You are an AI study assistant helping ${studentName} with their academic queries.
        Be concise and helpful with responses under 150 words.
        Focus on education-related topics including assignments, courses, schedules, and academic progress.
        
        Conversation history:
        ${conversationHistory}
        
        ${studentName}: ${userMessage}
        Assistant:
      `

      // Generate content
      const result = await model.generateContent(prompt)
      const response = result.response.text()

      // Add AI response to messages
      const newMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])
    } catch (error) {
      console.error("Error with Gemini API:", error)

      // Fallback response
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        text: "I'm having trouble connecting to my knowledge base right now. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = () => {
    if (inputText.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")

    // Generate AI response
    generateGeminiResponse(inputText)

    Keyboard.dismiss()
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [messages])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Study Assistant</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color="#333" />
        </Pressable>
      </View>

      <ScrollView ref={scrollViewRef} style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[styles.messageBubble, message.sender === "user" ? styles.userBubble : styles.aiBubble]}
          >
            <Text style={[styles.messageText, message.sender === "user" ? styles.userText : styles.aiText]}>
              {message.text}
            </Text>
            <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
          </View>
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.loadingText}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything about your studies..."
          placeholderTextColor="#999"
          multiline
        />
        <Pressable
          onPress={handleSend}
          style={({ pressed }) => [styles.sendButton, pressed && styles.sendButtonPressed]}
          disabled={inputText.trim() === "" || isLoading}
        >
          <MaterialIcons name="send" size={24} color={inputText.trim() === "" || isLoading ? "#ccc" : "#007AFF"} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
  },
  userBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#F0F0F0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "#fff",
  },
  aiText: {
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 18,
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 120,
  },
  sendButton: {
    marginLeft: 12,
    padding: 8,
  },
  sendButtonPressed: {
    opacity: 0.7,
  },
})

export default AIChat

