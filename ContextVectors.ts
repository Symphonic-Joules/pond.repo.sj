// src/core/ContextVectors.ts

/**
 * Represents the cognitive activity signal from the inference-node.
 * activity: A normalized floating-point number between 0.0 and 1.0,
 * where 0.0 is minimal activity and 1.0 is peak activity.
 */
export interface InferenceSignal {
    activity: number;
}

/**
 * Represents the user's emotional state signal from affect-synchrony.
 * valence:   A continuous scale from -1.0 (very negative emotion) to 1.0 (very positive emotion).
 * arousal:   A continuous scale from 0.0 (low arousal/calm) to 1.0 (high arousal/intense).
 * focus:     A categorical indicator of the user's engagement level.
 */
export interface AffectSignal {
    valence: number;
    arousal: number;
    focus: 'focused' | 'distracted' | 'neutral';
}

/**
 * The comprehensive ContextVector interface, combining various contextual elements
 * including semantic understanding, temporal aspects, user preferences,
 * and the newly integrated inference and affect signals.
 */
export interface ContextVector {
    // Semantic context representing thematic relevance or domain focus
    semanticContext: Record<string, number>; // e.g., { 'coding': 0.8, 'design': 0.3, 'bug_fixing': 0.6 }

    // Temporal context representing recency and frequency of interaction
    temporalContext: {
        recentActivityTimestamp: number; // Unix timestamp
        interactionFrequency: number;    // Interactions per minute, or similar
    };

    // User preference context (example dimensions)
    userPreferenceContext: {
        verbosity: number;   // e.g., 0.0 (concise) to 1.0 (verbose)
        detailLevel: number; // e.g., 0.0 (high-level) to 1.0 (detailed)
    };

    // Integrated signals for cognitive activity and emotional state
    inference: InferenceSignal;
    affect: AffectSignal;

    // Add other contextual dimensions as they are identified and defined
    // ...
}
