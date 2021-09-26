package com.highfive.momentrip;

import android.content.DialogInterface;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.GestureDetector;
import android.view.View;
import android.widget.ImageButton;
import android.widget.NumberPicker;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;
import androidx.viewpager.widget.ViewPager;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MakeMoment extends AppCompatActivity {
    GestureDetector detector;

    ViewPager viewPager;
    Fragment momentFragment;
    ViewPager pager;

    MomentActionBar momentActionBar;

    TextView selectedAlbum;
    String[] albums = {"여행집","제주도", "강릉", "나홀로 여행", "효도여행", "당일치기"};

    static RequestQueue requestQueue;


    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_make_moment);

        setActionBar();

        pager = findViewById(R.id.pager);
        pager.setOffscreenPageLimit(3);

        MyPagerAdapter adapter = new MyPagerAdapter(getSupportFragmentManager());

        MomentFragment fragment1 = new MomentFragment();
        adapter.addItem(fragment1);

        pager.setAdapter(adapter);

        if (requestQueue == null) {
            requestQueue = Volley.newRequestQueue(getApplicationContext()); //요청 큐 생성
        }

        //추가 메뉴 버튼(in상단바) 클릭 리스너
        ImageButton moreMenuButton = momentActionBar.getMoreMenuButton();
        moreMenuButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getApplicationContext(), "추가 메뉴 버튼 클릭", Toast.LENGTH_SHORT).show();
            }
        });

        //모멘트 추가 버튼(in상단바) 클릭 리스너
        ImageButton addMomentButton = momentActionBar.getAddMomentButton();
        addMomentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                adapter.addItem(new MomentFragment());
                pager.setCurrentItem(adapter.getCount() - 1);
            }
        });

        //앨범 설정하기
        selectedAlbum = momentActionBar.getSelectedAlbum();
        selectedAlbum.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showAlbumPickerDialog();
            }
        });

        //저장 버튼(in상단바) 클릭 리스너
        TextView saveButton = momentActionBar.getSaveButton();
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getApplicationContext(), "저장 버튼 클릭", Toast.LENGTH_SHORT).show();
                //makeRequest(); //서버요청!

            }
        });

        //turn버튼을 누르면 모멘트 회전
        ImageButton turnButton = (ImageButton) findViewById(R.id.turnButton);
        turnButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MomentFragment fragment = (MomentFragment) adapter.instantiateItem(pager, pager.getCurrentItem()); //현재 화면에 있는 프래그먼트 가져오기
                fragment.flipOver();
            }
        });

        //프래그먼트 삭제
//        detector = new GestureDetector(this, new OnSwipeListener() {
//            @Override
//            public boolean onSwipe(Direction direction) {
//                if (direction==Direction.up){
//
//                }
//
//                if (direction==Direction.down){
//
//                }
//                return true;
//            }
//        });
//
//        pager.setOnTouchListener(new View.OnTouchListener() {
//            @Override
//            public boolean onTouch(View v, MotionEvent event) {

//                return detector.onTouchEvent(event);
//            }
//        });

//        Button tempBut = findViewById(R.id.tempBut);
//        tempBut.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                MomentFragment curFragment = (MomentFragment) adapter.instantiateItem(pager, pager.getCurrentItem());
//                adapter.destroyItem(pager, pager.getCurrentItem(), curFragment);
//                pager.setCurrentItem(adapter.getCount() - 1);
//            }
//        });
    }

    private void setActionBar() {
        Log.d("mylog","getSupportActionBar() : " + getSupportActionBar());
        getSupportActionBar().setDisplayShowCustomEnabled(true); //커스터마이징 하기 위해 필요(이거 없어서 오류난거다. 화난다ㅠ)
        momentActionBar = new MomentActionBar(this, getSupportActionBar());

        momentActionBar.setActionBar();
        //momentActionBar.setSpinner(albums);
    }

    class MyPagerAdapter extends FragmentStatePagerAdapter {
        ArrayList<Fragment> items = new ArrayList<Fragment>(); //프래그먼트를 담아둘 객체

        public MyPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        public void addItem(Fragment item) {
            //프래그먼트 추가하기
            items.add(item);
            notifyDataSetChanged(); //어댑터에게 데이터가 변경되었다고 알려주기!
        }

        @Override
        public Fragment getItem(int position) {
            //프래그먼트 가져가기
            return items.get(position);
        }

        @Override
        public int getCount() {
            //프래그먼트 갯수 확인
            return items.size();
        }

        @Override
        public CharSequence getPageTitle(int position) {
            //타이틀스크립 설정
            return "페이지 " + position;
        }

        @Override public void destroyItem(View pager, int position, Object view) {
            //뷰 객체 삭제
            ((ViewPager)pager).removeView((View)view);
            items.remove(position);
            view = null;
            notifyDataSetChanged(); //어댑터에게 데이터가 변경되었다고 알려주기!
        }

    }

    // 호출할 다이얼로그 함수를 정의한다.
    @RequiresApi(api = Build.VERSION_CODES.Q)
    private void showAlbumPickerDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        final View view = this.getLayoutInflater().inflate(R.layout.dialog_album_picker, null);
        builder.setView(view);
        //builder.setTitle();
        final NumberPicker picker = (NumberPicker) view.findViewById(R.id.picker);
        picker.setMinValue(0);
        picker.setMaxValue(albums.length-1);
        picker.setDisplayedValues(albums);
        picker.setWrapSelectorWheel(false); //순환하지 않게

        builder.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int id) {
                selectedAlbum.setText(albums[picker.getValue()]);
            }
        })
                .setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int id) {
                        //negative button action
                    }
                });
        builder.create().show();
    }

    //-------------------------------------- 네트워킹! ----------------------------------------------
    public void makeRequest() {
        String url = ""; //서버 url주소

        //요청 객체 생성
        StringRequest request = new StringRequest(
                Request.Method.POST, //파라미터1, 요청 방식
                url, //파라미터2, 웹 사이트 주소
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        println("응답 -> " + response);
                    }
                }, //파라미터3, 응답받을 리스너
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        println("에러 -> " + error.getMessage());
                    }
                } //파라미터4, 오류 리스너
        ) {
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String,String> params = new HashMap<String,String>();
                //POST방식을 사용한다면, params객체에 파라미터 값을 넣어주면 됨

                return params;
            }
        };

        request.setShouldCache(false); //캐쉬를 사용하지 않도록 설정
        requestQueue.add(request); //요청 객체를 요청 큐에 넣기
        println("요청 보냄.");
    }

    public void println(String data) {
        Log.d("MainActivity", data);
    }
}