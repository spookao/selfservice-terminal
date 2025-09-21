package com.fastfood.app.util;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import java.awt.Toolkit;
import java.io.File;

public class SoundUtil {
    
    public static void playNotificationSound() {
        try {
            File soundFile = new File("notification.wav");
            if (!soundFile.exists()) {
                Toolkit.getDefaultToolkit().beep();
                return;
            }
            
            AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(soundFile);
            Clip clip = AudioSystem.getClip();
            clip.open(audioInputStream);
            clip.start();
        } catch (Exception e) {
            e.printStackTrace();
            Toolkit.getDefaultToolkit().beep();
        }
    }
}