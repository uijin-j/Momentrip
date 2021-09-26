package com.highfive.momentrip;

import android.os.Bundle;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

public class PolaActivity extends AppCompatActivity {

    int countP_1 = 1; // 클릭 횟수

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pola);

        FrameLayout frameLayout =(FrameLayout)findViewById(R.id.jeju_part1);
        ImageView imageView = (ImageView)findViewById(R.id.jeju_pic1);
        LinearLayout polatext = (LinearLayout) findViewById(R.id.jeju_text1);
        LinearLayout button1 =(LinearLayout) findViewById(R.id.jeju_button1);

        frameLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    if(countP_1 != 0){
                        polatext.setVisibility(View.VISIBLE);
                        button1.setVisibility(View.VISIBLE); // 이건 보이게 하고
                        imageView.setVisibility(View.GONE); // 아예 위젯 조차 남아있지 않도록 사라지게!
                        countP_1= 0;
                    }
                    else {
                        polatext.setVisibility(View.GONE);
                        button1.setVisibility(View.GONE); // 이건 보이게 하고
                        imageView.setVisibility(View.VISIBLE); // 아예 위젯 조차 남아있지 않도록 사라지게!
                        countP_1= 1;
                    }
            }
        });
    }
}