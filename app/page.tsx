"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function WelcomePage() {
  const [showApp, setShowApp] = useState(false)

  if (showApp) {
    return <DashboardPage />
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          🍏
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-[#1F1F1F] font-poppins">AppleTrack</h1>
          <p className="text-lg text-[#1F1F1F]/70 font-poppins font-light max-w-sm">
            One bite at a time. Build your habits, beautifully.
          </p>
          <p className="text-base text-[#1F1F1F]/60 font-poppins font-light">Track habits, not stress.</p>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Button
            onClick={() => setShowApp(true)}
            className="bg-[#A8D5BA] hover:bg-[#96C7A8] text-white font-medium px-8 py-6 rounded-full text-lg font-poppins shadow-lg transition-all duration-300"
          >
            Let's Begin
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

function DashboardPage() {
  const [currentView, setCurrentView] = useState("home")
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink Water", icon: "💧", time: "8 AM", frequency: "Daily", completed: false, streak: 3 },
    { id: 2, name: "Read Books", icon: "📚", time: "9 PM", frequency: "Daily", completed: true, streak: 7 },
    { id: 3, name: "Exercise", icon: "🏃", time: "7 AM", frequency: "Daily", completed: false, streak: 2 },
    { id: 4, name: "Eat Healthy", icon: "🍎", time: "12 PM", frequency: "Daily", completed: true, streak: 5 },
  ])

  const toggleHabit = (id: number) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit)))
  }

  const completedToday = habits.filter((h) => h.completed).length
  const totalHabits = habits.length
  const progressPercentage = (completedToday / totalHabits) * 100

  if (currentView === "add") {
    return (
      <AddHabitPage
        onBack={() => setCurrentView("home")}
        onSave={(habit) => {
          setHabits([...habits, { ...habit, id: Date.now(), completed: false, streak: 0 }])
          setCurrentView("home")
        }}
      />
    )
  }

  if (currentView === "stats") {
    return <StatsPage habits={habits} onBack={() => setCurrentView("home")} />
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="p-6 pt-12">
        <h1 className="text-2xl font-medium text-[#1F1F1F] font-poppins mb-2">Hi, Praise 👋</h1>
        <p className="text-[#1F1F1F]/60 font-poppins font-light">Ready to grow?</p>
      </motion.div>

      {/* Progress Ring */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="px-6 mb-8">
        <Card className="p-6 bg-white rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-[#1F1F1F] font-poppins mb-1">Today's Progress</h3>
              <p className="text-[#1F1F1F]/60 font-poppins font-light text-sm">
                {completedToday} of {totalHabits} completed
              </p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EAEAEA"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#A8D5BA"
                  strokeWidth="2"
                  strokeDasharray={`${progressPercentage}, 100`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-[#1F1F1F] font-poppins">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Habits List */}
      <div className="px-6 space-y-4">
        <h2 className="text-xl font-medium text-[#1F1F1F] font-poppins mb-4">Today's Habits</h2>

        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`p-4 rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0 transition-all duration-300 ${
                habit.completed ? "bg-[#7CC77F]/10" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{habit.icon}</div>
                  <div>
                    <h3
                      className={`font-medium font-poppins ${
                        habit.completed ? "text-[#7CC77F] line-through" : "text-[#1F1F1F]"
                      }`}
                    >
                      {habit.name}
                    </h3>
                    <p className="text-sm text-[#1F1F1F]/60 font-poppins font-light">
                      {habit.frequency} · {habit.time}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    habit.completed
                      ? "bg-[#7CC77F] border-[#7CC77F] text-white"
                      : "border-[#EAEAEA] hover:border-[#A8D5BA]"
                  }`}
                >
                  {habit.completed && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-sm">
                      ✓
                    </motion.div>
                  )}
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        onClick={() => setCurrentView("add")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#A8D5BA] hover:bg-[#96C7A8] text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300"
      >
        +
      </motion.button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(0,0,0,0.05)] px-6 py-4">
        <div className="flex justify-around">
          <button
            onClick={() => setCurrentView("home")}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              currentView === "home" ? "bg-[#A8D5BA]/20 text-[#A8D5BA]" : "text-[#1F1F1F]/40"
            }`}
          >
            🏠
          </button>
          <button
            onClick={() => setCurrentView("add")}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              currentView === "add" ? "bg-[#A8D5BA]/20 text-[#A8D5BA]" : "text-[#1F1F1F]/40"
            }`}
          >
            ➕
          </button>
          <button
            onClick={() => setCurrentView("stats")}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              currentView === "stats" ? "bg-[#A8D5BA]/20 text-[#A8D5BA]" : "text-[#1F1F1F]/40"
            }`}
          >
            📊
          </button>
          <button className="p-3 rounded-2xl text-[#1F1F1F]/40">⚙️</button>
        </div>
      </div>
    </div>
  )
}

function AddHabitPage({ onBack, onSave }: { onBack: () => void; onSave: (habit: any) => void }) {
  const [habitName, setHabitName] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("🍎")
  const [frequency, setFrequency] = useState("Daily")
  const [time, setTime] = useState("9:00 AM")

  const icons = ["🍎", "💧", "📚", "🏃", "🧘", "🌱", "💪", "🎯", "✨", "🌟"]

  const handleSave = () => {
    if (habitName.trim()) {
      onSave({
        name: habitName,
        icon: selectedIcon,
        frequency,
        time,
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6 pt-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-[#EAEAEA]/50 transition-colors">
            ←
          </button>
          <h1 className="text-xl font-medium text-[#1F1F1F] font-poppins">Add New Habit</h1>
          <div></div>
        </div>

        {/* Habit Name */}
        <Card className="p-6 bg-white rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0">
          <label className="block text-sm font-medium text-[#1F1F1F] font-poppins mb-3">Habit Name</label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="e.g., Drink water"
            className="w-full p-4 rounded-2xl bg-[#FAFAFA] border-0 focus:ring-2 focus:ring-[#A8D5BA] outline-none font-poppins"
          />
        </Card>

        {/* Icon Picker */}
        <Card className="p-6 bg-white rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0">
          <label className="block text-sm font-medium text-[#1F1F1F] font-poppins mb-3">Choose Icon</label>
          <div className="grid grid-cols-5 gap-3">
            {icons.map((icon) => (
              <button
                key={icon}
                onClick={() => setSelectedIcon(icon)}
                className={`p-4 rounded-2xl text-2xl transition-all duration-300 ${
                  selectedIcon === icon ? "bg-[#A8D5BA]/20 ring-2 ring-[#A8D5BA]" : "bg-[#FAFAFA] hover:bg-[#EAEAEA]/50"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </Card>

        {/* Frequency */}
        <Card className="p-6 bg-white rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0">
          <label className="block text-sm font-medium text-[#1F1F1F] font-poppins mb-3">Frequency</label>
          <div className="grid grid-cols-3 gap-3">
            {["Daily", "Weekly", "Monthly"].map((freq) => (
              <button
                key={freq}
                onClick={() => setFrequency(freq)}
                className={`p-3 rounded-2xl font-poppins font-medium transition-all duration-300 ${
                  frequency === freq ? "bg-[#A8D5BA] text-white" : "bg-[#FAFAFA] text-[#1F1F1F] hover:bg-[#EAEAEA]/50"
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </Card>

        {/* Time */}
        <Card className="p-6 bg-white rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0">
          <label className="block text-sm font-medium text-[#1F1F1F] font-poppins mb-3">Reminder Time</label>
          <input
            type="time"
            value={time.split(" ")[0]}
            onChange={(e) => setTime(e.target.value + " AM")}
            className="w-full p-4 rounded-2xl bg-[#FAFAFA] border-0 focus:ring-2 focus:ring-[#A8D5BA] outline-none font-poppins"
          />
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={!habitName.trim()}
          className="w-full bg-gradient-to-r from-[#A8D5BA] to-[#96C7A8] hover:from-[#96C7A8] hover:to-[#84B596] text-white font-medium py-6 rounded-3xl text-lg font-poppins shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          Save Habit
        </Button>
      </motion.div>
    </div>
  )
}

function StatsPage({ habits, onBack }: { habits: any[]; onBack: () => void }) {
  const totalStreak = Math.max(...habits.map((h) => h.streak))
  const completedHabits = habits.filter((h) => h.completed).length

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6 pt-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-[#EAEAEA]/50 transition-colors">
            ←
          </button>
          <h1 className="text-xl font-medium text-[#1F1F1F] font-poppins">Your Progress</h1>
          <div></div>
        </div>

        {/* Streak Badge */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="p-6 bg-gradient-to-r from-[#A8D5BA] to-[#96C7A8] rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0 text-center">
            <div className="text-4xl mb-2">🍀</div>
            <h2 className="text-2xl font-semibold text-white font-poppins mb-1">{totalStreak}-Day Streak</h2>
            <p className="text-white/80 font-poppins font-light">Keep it up! You're doing amazing</p>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 bg-white rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0 text-center">
            <div className="text-3xl font-bold text-[#A8D5BA] font-poppins mb-1">{completedHabits}</div>
            <p className="text-[#1F1F1F]/60 font-poppins font-light text-sm">Completed Today</p>
          </Card>

          <Card className="p-6 bg-white rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0 text-center">
            <div className="text-3xl font-bold text-[#A8D5BA] font-poppins mb-1">{habits.length}</div>
            <p className="text-[#1F1F1F]/60 font-poppins font-light text-sm">Total Habits</p>
          </Card>
        </div>

        {/* Weekly Calendar */}
        <Card className="p-6 bg-white rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0">
          <h3 className="text-lg font-medium text-[#1F1F1F] font-poppins mb-4">This Week</h3>
          <div className="grid grid-cols-7 gap-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-[#1F1F1F]/60 font-poppins mb-2">{day}</div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    index < 4 ? "bg-[#7CC77F] text-white" : "bg-[#EAEAEA] text-[#1F1F1F]/40"
                  }`}
                >
                  {index < 4 ? "✓" : index + 1}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Habit Breakdown */}
        <Card className="p-6 bg-white rounded-3xl shadow-[0px_6px_24px_rgba(0,0,0,0.04)] border-0">
          <h3 className="text-lg font-medium text-[#1F1F1F] font-poppins mb-4">Habit Streaks</h3>
          <div className="space-y-3">
            {habits.map((habit) => (
              <div key={habit.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{habit.icon}</span>
                  <span className="font-poppins text-[#1F1F1F]">{habit.name}</span>
                </div>
                <div className="text-[#A8D5BA] font-medium font-poppins">{habit.streak} days</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
