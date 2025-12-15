class AudioService {
    private audioContext: AudioContext | null = null
    private gainNode: GainNode | null = null

    private initAudio() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            this.gainNode = this.audioContext.createGain()
            this.gainNode.connect(this.audioContext.destination)
        }
    }

    playNotificationSound(volume: number = 70) {
        this.initAudio()

        if (!this.audioContext || !this.gainNode) return

        // Create a pleasant chime using oscillators
        const now = this.audioContext.currentTime

        // Set volume (0-100 to 0-1)
        this.gainNode.gain.value = volume / 100

        // Create two oscillators for a pleasant chord
        const osc1 = this.audioContext.createOscillator()
        const osc2 = this.audioContext.createOscillator()

        // C note (523.25 Hz) and E note (659.25 Hz) for a pleasant sound
        osc1.frequency.value = 523.25
        osc2.frequency.value = 659.25

        osc1.type = 'sine'
        osc2.type = 'sine'

        // Create envelope for smooth attack and release
        const osc1Gain = this.audioContext.createGain()
        const osc2Gain = this.audioContext.createGain()

        osc1Gain.gain.setValueAtTime(0, now)
        osc1Gain.gain.linearRampToValueAtTime(0.3, now + 0.05)
        osc1Gain.gain.linearRampToValueAtTime(0, now + 0.5)

        osc2Gain.gain.setValueAtTime(0, now)
        osc2Gain.gain.linearRampToValueAtTime(0.2, now + 0.05)
        osc2Gain.gain.linearRampToValueAtTime(0, now + 0.5)

        osc1.connect(osc1Gain)
        osc2.connect(osc2Gain)
        osc1Gain.connect(this.gainNode)
        osc2Gain.connect(this.gainNode)

        osc1.start(now)
        osc2.start(now)

        osc1.stop(now + 0.5)
        osc2.stop(now + 0.5)
    }
}

export const audioService = new AudioService()
