"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, ActivityIndicator } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

interface AIChatProps {
  studentName: string
  onClose: () => void
}

const AIChat: React.FC<AIChatProps> = ({ studentName, onClose }) => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "ai" }>>([
    {
      text: `Hello ${studentName}! I'm your AI assistant. How can I help you with your studies today?`,
      sender: "ai",
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [messages])

  const sendMessage = async () => {
    if (!inputText.trim()) return

    // Add user message to chat
    const userMessage = { text: inputText, sender: "user" as const }
    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    try {
      // Prepare the request to Gemini API
      const apiKey = "AIzaSyBjZMXVy-9pCt2JZacTSxkbvCHcN8YDZ-M"
      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyBjZMXVy-9pCt2JZacTSxkbvCHcN8YDZ-M
`

      // Create conversation history for context
      const conversationHistory = messages.map((msg) => ({
        "role": "user",
        "parts": [{ "text": "User's message" }]
      }
      ))

      // Add the new user message
      conversationHistory.push({
        role: "user",
        parts: [{ text: inputText }],
      })

      // Prepare the request body
      const requestBody = {
        contents: [
          {
            role: "model",
            parts: [
              {
                text: `You are an AI assistant for a student named ${studentName}. You help with educational questions, provide study tips, and assist with assignments. Keep responses concise, helpful, and educational. dont return output in markdown or any other symbols like *`,
              },
            ],
          },
          ...conversationHistory, 
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }

      // Make the API call
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()
      console.log(data);

      // Extract the response text
      let aiResponse = "Sorry, I couldn't generate a response. Please try again."

      if (data?.candidates?.[0]?.content?.parts?.length > 0) {
        aiResponse = data.candidates[0].content.parts[0].text
      }
      

      // Add AI response to chat
      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }])
    } catch (error) {
      console.error("Error getting AI response:", error)
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I encountered an error. Please try again later.", sender: "ai" },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <Pressable onPress={onClose}>
          <MaterialIcons name="close" size={24} color="#333" />
        </Pressable>
      </View>

      <ScrollView style={styles.messagesContainer} ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[styles.messageBubble, message.sender === "user" ? styles.userMessage : styles.aiMessage]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#408c4c" />
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
        <Pressable style={styles.sendButton} onPress={sendMessage} disabled={isLoading || !inputText.trim()}>
          <MaterialIcons name="send" size={24} color={isLoading || !inputText.trim() ? "#ccc" : "#408c4c"} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "JosefinSans-Bold",
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#e6f7ff",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "JosefinSans-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontFamily: "JosefinSans-Regular",
  },
  sendButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
})

export default AIChat

